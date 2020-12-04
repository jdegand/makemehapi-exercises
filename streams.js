const Hapi = require('@hapi/hapi');
const Rot13 = require('rot13-transform');
const Fs = require('fs');
const Path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: Number(process.argv[2] || 8080),
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          return Fs.createReadStream(Path.join(__dirname,'sample.txt'))
          .pipe(Rot13())
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

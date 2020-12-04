const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: Number(process.argv[2] || 8080),
        host: 'localhost'
    });

    await server.register(Vision);

    server.views({
         engines: {
             html: require('handlebars')
         },
         path: Path.join(__dirname, 'templates'),
         helpersPath: Path.join(__dirname,'helpers')
     });

    server.route({
        method: 'GET',
        path: '/',
        handler: {
          view: "template.html"
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

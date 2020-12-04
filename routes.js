const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: Number(process.argv[2] || 8080),
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: (request, h) => {

            return `Hello ${request.params.name}`;
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

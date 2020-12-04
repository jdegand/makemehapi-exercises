'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
      port: Number(process.argv[2] || 8080),
      host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname)
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: {
          file: 'index.html'
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();

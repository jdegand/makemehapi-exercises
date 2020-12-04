'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
      port: Number(process.argv[2] || 8080),
      host: 'localhost'
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/foo/bar/baz/{filename}',
        handler: {
           directory: { path: Path.join(__dirname, 'public') }
       }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();

const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');

const init = async () => {

  const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2] || 8080)
  });

  await server.register(H2o2);

  server.route({
      method:'GET',
      path: '/proxy',
      handler: {
      proxy: {
        host: '127.0.0.1',
        port: 65535
      }
    }
  });

      server.start();

      console.log('Server running at:', server.info.uri);
}

init();

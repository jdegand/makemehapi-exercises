const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {

  const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
  });

  server.route({
    method: 'GET',
    path: '/chickens/{breed?}',
    config: {
      handler: (request, h) => `You asked for the chicken ${request.params.breed}`,
      validate: {
        params: Joi.object({
          breed: Joi.string().required()
        })
      }
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

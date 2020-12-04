const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {

  const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
  });

  server.route({
    method: 'POST',
    path: '/login',
    config: {
      handler: (request, h)=> {
        return 'login successful';
      },
      // doesn't validate solution strictly
             validate: {
                payload: Joi.object({
                     isGuest: Joi.boolean(),
                     username: Joi.string(),
                     password: Joi.string().alphanum(),
                     accessToken: Joi.string().alphanum(),
                     email: Joi.string().email()
                })
                .options({allowUnknown: true})
                .without('password', 'accessToken')
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

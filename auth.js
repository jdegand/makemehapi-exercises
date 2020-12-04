const Hapi = require('@hapi/hapi');

const user = { name: 'hapi', password: 'auth' };

const validate = async (request, username, password, h) => {
  const isValid = username === user.name && password === user.password;

  return { isValid, credentials: { name: user.name } };
};

/*
const validate = async (request, username, password) => {
  let isValid = false;
  if(username === 'hapi' && password === 'auth'){
    return !isValid;
  }
  return isValid;
};
*/

const init = async () => {

  const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
  });

  await server.register(require('@hapi/basic'));

  server.auth.strategy('simple', 'basic', { validate });
  server.auth.default('simple');

  server.route({
      method: 'GET',
      path: '/',
      handler: function(request, h) {
        return 'Welcome'
      }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();

const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
  });


  server.state('session', {
    ttl: 10,
    encoding: 'base64json',
    domain: 'localhost',
    path: '/',
    isSameSite: false, // validation needs these to be false
    isSecure: false,
    isHttpOnly: false
  });


  server.route({
      method: 'GET',
      path: '/set-cookie',
      handler: function (request, h) {
          h.state('session', {key: 'makemehapi'})
          return h.response('Hello');
      }
  });

  server.route({
  method: 'GET',
  path: '/check-cookie',
  handler: (request, h) => {
    const cookie = request.state.session;

    if (cookie) {
      return { user: 'hapi' };
    } else {
      console.log('Error')
    }
  }, // below needs to be added to pass validation
  options: {
    state: {
      parse: true,
      failAction: 'log'
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

var Hapi = require('@hapi/hapi');

var server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2] || 8080)
  });

function hello(request, h){
  return 'Hello hapi'
}

server.route({path: '/', method:'GET', handler: hello });

server.start();

console.log('Server running at:', server.info.uri);

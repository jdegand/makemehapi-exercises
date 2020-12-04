const Hapi = require('@hapi/hapi');
const Fs = require('fs');

const init = async () => {

  const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
  });

  //need to use promises

  server.route({
      method: 'POST',
      path: '/upload',
      handler: (request, h) => new Promise((resolve, reject) => {
        let body = '';

        request.payload.file.on('data', (data) => {
          body += data;
        });

        request.payload.file.on('end', () => {
          const result = {
            description: request.payload.description,
            file: {
              data: body,
              filename: request.payload.file.hapi.filename,
              headers: request.payload.file.hapi.headers
            }
          };

          return resolve(JSON.stringify(result));
        });

        request.payload.file.on('error', err => reject(err));
      }),
      options: {
        payload: {
          output: 'stream',
          parse: true,
          multipart: true
        }
      }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
  });
}

init();

var jsonParser = require('revolt-json-parser');
var revolt = require('revolt');
var Rx = require('rx');

module.exports = function(options) {
  return function(server) {
    server.onPeerResponse(function(request) {
      return request
        .flatMap(function(env) {
          var peerOptions = env.request.raw;
          if (env.response.statusCode === 401) {
            env.response.socket.end();

            return revolt()
              .use(jsonParser) 
              .request(options)
              .flatMap(function(env) {
                if (env.response.statusCode === 200) {
                  peerOptions.headers['Authorization'] = 'Bearer ' + env.response.body.access_token;

                  env.response.socket.end();

                  return revolt()
                    .use(jsonParser)
                    .request(peerOptions);
                } else {
                  return Rx.Observable.throw(new Error('Invalid credentials'));
                }
              });

          } else {
            return Rx.Observable.just(env);
          }
        });
    });
  };
};

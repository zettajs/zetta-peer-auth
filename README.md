# zetta-peer-auth

Add an authorization upon receiving 401 responses from peers.

## Install

`npm install zetta-peer-auth`

## Usage

```js
var zetta = require('zetta');
var auth = require('zetta-peer-auth');

var options = {
  headers: {
    'Authorization': new Buffer('user:password').toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  url: 'https://<authorizationserver>',
  method: 'POST',
  body: 'grant_type=client_credentials'
};

zetta()
  .use(auth(options))
  .link('http://centralite-test.apigee.net/zetta-cloud-2')
  .listen(3001)
```

## License

MIT

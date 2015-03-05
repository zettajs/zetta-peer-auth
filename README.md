# zetta-peer-auth

Add authorization to Zetta peer requests.

Note: This currently only supports the OAuth Client Credentials grant type.

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
  url: 'https://<authorization_server>',
  method: 'POST',
  body: 'grant_type=client_credentials'
}; // request to receive an access token

zetta()
  .use(auth(options))
  .link('http://<resource_server>')
  .listen(3001)
```

## License

MIT

const rp = require('request-promise');
const {Buffer} = require('buffer');
const config = require('../config');

class CreateSecretOptions {
  constructor (name, password) {
    this.method = 'POST';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/secrets`;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.json = true;
    this.body = {"kind":"Secret","apiVersion":"v1","metadata":{"name":`mysql-${name}`,"creationTimestamp":null},"data":{"password": Buffer.from(password).toString('base64')}};
  }
};

module.exports = (name, password) => rp(new CreateSecretOptions(name, password));

const rp = require('request-promise');
const config = require('../config');

class DeleteSecretsOptions  {
  constructor (name) {
    this.method = 'DELETE';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/secrets/mysql-${name}`;
    this.json = true;
    this.headers = {Accept: 'application/json'};
    this.body = {orphanDependents: false};
  }
}

module.exports = (name) => rp(new DeleteSecretsOptions(name));

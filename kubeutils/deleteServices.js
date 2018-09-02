const rp = require('request-promise');
const config = require('../config');

class DeleteServicesOptions  {
  constructor (name) {
    this.method = 'DELETE';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/services/${name}`;
    this.json = true;
    this.headers = {Accept: 'application/json'};
    this.body = {orphanDependents: false};
  }
}

module.exports = (name) => {
  const deleteMySqlServiceOptions = new DeleteServicesOptions(`mysql-${name}`);
  const deleteWordpressServiceOptions = new DeleteServicesOptions(`wordepress-${name}`);

  return Promise.all([
    rp(deleteMySqlServiceOptions),
    rp(deleteWordpressServiceOptions)
  ]);
};

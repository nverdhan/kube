const rp = require('request-promise');
const config = require('./config');

class DeleteVolumeClaimOptions  {
  constructor (name) {
    this.method = 'DELETE';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/persistentvolumeclaims/${name}`;
    this.json = true;
    this.headers = {Accept: 'application/json'};
    this.body = {orphanDependents: false};
  }
}

module.expoerts = async (name) => {
  const mySqlVolumeClaimOptions = new DeleteVolumeClaimOptions(`mysql-volumeclaim-${name}`);
  const wordpressVolumeClaimOptions = new DeleteVolumeClaimOptions(`wordpress-volumeclaim-${name}`);

  return Promise.all([
    rp(mySqlVolumeClaimOptions),
    rp(wordpressVolumeClaimOptions)
  ]);
};

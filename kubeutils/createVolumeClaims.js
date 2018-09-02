const rp = require('request-promise');
const config = require('../config');

class VolumeClaimData {
  constructor (name, storage) {
    this.kind = "PersistentVolumeClaim";
    this.apiVersion = 'v1';
    this.metadata = {name};
    this.spec = {
      "accessModes": [
        "ReadWriteOnce"
      ],
      "resources": {
        "requests": {
          "storage": storage
        }
      }
    };
  }
};

class VolumeClaimOptions {
  constructor (body) {
    this.method = 'POST';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/persistentvolumeclaims`;
    this.json = true;
    this.headers = {Accept: 'application/json'};
    this.body = body;
  }
}

module.exports = (name) => {
  const mySqlVolumeClaimOptions = new VolumeClaimOptions(new VolumeClaimData(`mysql-volumeclaim-${name}`, '2Gi'));
  const wordpressVolumeClaimOptions = new VolumeClaimOptions(new VolumeClaimData(`wordpress-volumeclaim-${name}`, '2Gi'));

  return Promise.all([
    rp(mySqlVolumeClaimOptions),
    rp(wordpressVolumeClaimOptions)
  ]);
};

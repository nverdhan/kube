const rp = require('request-promise');
const config = require('./config');

class MySqlVolumeClaim {
  constructor (name) {
    this.kind = "PersistentVolumeClaim";
    this.apiVersion = 'v1';
    this.metadata = {name: `mysql-volumeclaim-${name}`};
    this.spec = {
      "accessModes": [
        "ReadWriteOnce"
      ],
      "resources": {
        "requests": {
          "storage": "2Gi"
        }
      }
    };
  }
};

const createMySqlVolumeClaim = async (name) => {
  const opts = {
    method: 'POST',
    uri: `${config.endpoint}/api/v1/namespaces/default/persistentvolumeclaims`,
    json: true,
    headers: {
      Accept: 'application/json'
    },
    body: new MySqlVolumeClaim(name)
  };

  return rp(opts).then(res => {
    console.log('OK', res);
  }).catch(err => {
    console.log('ERR', err);
  })
};

module.exports = createMySqlVolumeClaim;

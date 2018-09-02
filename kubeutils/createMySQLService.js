const rp = require('request-promise');
const config = require('../config');

class CreateMySQLServiceOptions {
  constructor (name) {
    this.method = 'POST';
    this.uri = `${config.endpoint}/api/v1/namespaces/default/services`;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.json = true;
    this.body = {
      "apiVersion":"v1",
      "kind":"Service",
      "metadata":{
         "labels":{
            "app":`mysql-${name}`
         },
         "name":`mysql-${name}`,
         "namespace":"default"
      },
      "spec":{
         "ports":[
            {
               "port":3306
            }
         ],
         "selector":{
            "app":"mysql"
         },
         "type":"ClusterIP"
      }
   };
  }
};

module.exports = name => rp(new CreateMySQLServiceOptions(name));

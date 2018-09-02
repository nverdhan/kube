const rp = require('request-promise');
const config = require('../config');

class StartWordpressServiceOptions {
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
            "app":`wordpress-${name}`
         },
         annotations: {
          'nginx.ingress.kubernetes.io/affinity': 'cookie'
         },
         "name":`wordpress-${name}`,
         "namespace":"default"
      },
      "spec":{
         "ports":[
            {
               "port":80,
               "protocol":"TCP",
               "targetPort":80
            }
         ],
         "selector":{
            "app":`wordpress-${name}`
         }
      }
    }
  }
};

module.exports = name => rp(new StartWordpressServiceOptions(name));

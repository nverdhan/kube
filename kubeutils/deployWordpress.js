const rp = require('request-promise');
const config = require('../config');

class DeployWordpressOptions {
  constructor (name) {
    this.method = 'POST';
    this.uri = `${config.endpoint}/apis/extensions/v1beta1/namespaces/default/deployments`;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.json = true;
    this.body = {
      "apiVersion":"extensions/v1beta1",
      "kind":"Deployment",
      "metadata":{
         "labels":{
            "app":`wordpress-${name}`
         },
         "name":`wordpress-${name}`,
         "namespace":"default"
      },
      "spec":{
         "replicas":1,
         "selector":{
            "matchLabels":{
               "app":`wordpress-${name}`
            }
         },
         "template":{
            "metadata":{
               "labels":{
                  "app":`wordpress-${name}`
               }
            },
            "spec":{
               "containers":[
                  {
                    "env":[
                      {
                          "name":"WORDPRESS_DB_HOST",
                          "value":`mysql-${name}:3306`
                      },
                      {
                          "name":"WORDPRESS_DB_PASSWORD",
                          "valueFrom":{
                            "secretKeyRef":{
                                "key":"password",
                                "name":`mysql-${name}`
                            }
                          }
                      }
                    ],
                    "image":"wordpress",
                    "name":"wordpress",
                    "ports":[
                      {
                          "containerPort":80,
                          "name":"wordpress"
                      }
                    ],
                    "volumeMounts":[
                      {
                          "mountPath":"/var/www/html",
                          "name":`wordpress-persistent-storage-${name}`
                      }
                    ],
                    "livenessProbe": {
                      "httpGet": null,
                      "initialDelaySeconds": 15,
                      "path": "/wp-admin",
                      "periodSeconds": 5,
                      "port": 80
                    },
                    "readinessProbe": {
                      "httpGet": null,
                      "initialDelaySeconds": 15,
                      "path": "/wp-admin",
                      "port": 80
                    }
                  }
               ],
               "volumes":[
                  {
                     "name":`wordpress-persistent-storage-${name}`,
                     "persistentVolumeClaim":{
                        "claimName":`wordpress-volumeclaim-${name}`
                     }
                  }
               ]
            }
         }
      }
    }
  }
};

module.exports = name => rp(new DeployWordpressOptions(name));

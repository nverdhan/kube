const rp = require('request-promise');
const config = require('./config');

class DeployMySQLOptions {
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
            "app":`mysql-${name}`
         },
         "name":`mysql-${name}`,
         "namespace":"default"
      },
      "spec":{
         "replicas":1,
         "selector":{
            "matchLabels":{
               "app":`mysql-${name}`
            }
         },
         "template":{
            "metadata":{
               "labels":{
                  "app":`mysql-${name}`
               }
            },
            "spec":{
               "containers":[
                  {
                     "env":[
                        {
                           "name":"MYSQL_ROOT_PASSWORD",
                           "valueFrom":{
                              "secretKeyRef":{
                                 "key":"password",
                                 "name": `mysql-${name}`
                              }
                           }
                        }
                     ],
                     "image":"mysql:5.6",
                     "name":"mysql",
                     "ports":[
                        {
                           "containerPort":3306,
                           "name":"mysql"
                        }
                     ],
                     "volumeMounts":[
                        {
                           "mountPath":"/var/lib/mysql",
                           "name":`mysql-persistent-storage-${name}`
                        }
                     ]
                  }
               ],
               "volumes":[
                  {
                     "name":`mysql-persistent-storage-${name}`,
                     "persistentVolumeClaim":{
                        "claimName": `mysql-volumeclaim-${name}`
                     }
                  }
               ]
            }
         }
      }
   }
  }
};

module.exports = name => rp(new DeployMySQLOptions(name));

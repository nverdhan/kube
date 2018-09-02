const createVolumeClaims = require('./createVolumeClaims');
const createMySQLService = require('./createMySQLService');
const createSecret = require('./createSecret');
const deployMysql = require('./deployMysql');
const deployWordpress = require('./deployWordpress');
const startWordpressService = require('./startWordpressService');

const deleteVolumeClaims = require('./deleteVolumeClaims');
const deleteServices = require('./deleteServices');
const deleteSecrets = require('./deleteSecrets');

module.exports = {
  createVolumeClaims,
  createSecret,
  deployMysql,
  createMySQLService,
  deployWordpress,
  startWordpressService,
  deleteVolumeClaims,
  deleteServices,
  deleteSecrets
};

const createVolumeClaims = require('./createVolumeClaims');
const createMySQLService = require('./createMySQLService');
const createSecret = require('./createSecret');
const deployMysql = require('./deployMysql');
const deployWordpress = require('./deployWordpress');
const startWordpressService = require('./startWordpressService');

module.exports = {
  createVolumeClaims,
  createSecret,
  deployMysql,
  createMySQLService,
  deployWordpress,
  startWordpressService
};

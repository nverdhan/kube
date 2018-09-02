const kubeutils = require('./kubeutils');

const deployWordpressSite = async (name) => {
  let res = await kubeutils.createVolumeClaims(name);
  console.log(res);
  res = await kubeutils.createSecret(name, 'SOME STRONG PASSWORD');
  console.log(res);
  res = await kubeutils.deployMysql(name);
  console.log(res);
  res = await kubeutils.createMySQLService(name);
  console.log(res);
  res = await kubeutils.deployWordpress(name);
  console.log(res);
  res = await kubeutils.startWordpressService(name);
  console.log(res);
};

deployWordpressSite('xxx');

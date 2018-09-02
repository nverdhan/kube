const kubeutils = require('./kubeutils');

const cleanup = async (name) => {
  let res = await kubeutils.deleteVolumeClaims(name);
  console.log(res);
  res = await kubeutils.deleteServices(name);
  console.log(res);
  res = await kubeutils.deleteSecrets(name);
  console.log(res);
};

cleanup('xxx');
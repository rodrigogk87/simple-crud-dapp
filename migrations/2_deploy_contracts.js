const Crud = artifacts.require("Crud");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Crud);
};

const HDWalletProvider = require("truffle-hdwallet-provider");
const privateKey = "FE1843E59D40DD88804C919942DC2CBFD3520425F196973662C73C35B5E633B6";
const infuraAPIKey = "4a6ad2a45eab4a129b75c9db9f31a383";


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(privateKey, "https://rinkeby.infura.io/v3/" + infuraAPIKey);
      },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};
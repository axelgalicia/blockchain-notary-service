const HDWalletProvider = require("truffle-hdwallet-provider");
const privateKey = "[REPLACE WITH PRIVATE KEY]";
const infuraAPIKey = "[INFURA API KEY]";


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
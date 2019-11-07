const HDWalletProvider = require('truffle-hdwallet-provider');


const infuraKey = "dfbf1129cc0044cf8c514f6c9e2c0f20";
//const mnemonic = "lamp hotel soda banana dilemma bid machine spell media tip visit swap";
const mnemonic = "marine waste meat ready empty false health alone shuffle globe auto good";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000
    },
  }
};
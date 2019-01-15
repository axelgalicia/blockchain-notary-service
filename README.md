# Decentralized Star Notary Service

This applications allows to register Stars using a unique identifier.

- Users can register its own Stars by providing the name of the star and the ID.

- User can also search for stars already stored in the Smart Contract in the Network.

This is a simple Decentralized Application which is deployed on **Rinkeby** Ethereum network.

### How to use it

## Installation

1) Install Node.js
2) Install truffle
```
npm install -g truffle
```
2) Clone this repository and Install dependencies for Truffle HD Wallet
  ```
   npm install truffle-hdwallet-provider
  ```
3) You can run the tests by using this command (Optional)
```
truffle develop
```
```
truffle(develop): test
```
## How to run the webapp

3) Change to the **app** folder and run the web application with the command below:

```
npm install
```
```
npm run dev
```

The application will indicate in which URL can be accessed.

4) Open the browser and make sure you are connected to **Rinkeby** Testnet network on Metamask and that you have enough balance to star registering Stars.

The TokenId Smart Contract was based in the standard ERC-721 for non fungible tokens.

**Where to find the contract**

The contract can be seen on Etherscan website with the link below:

Contract:
https://rinkeby.etherscan.io/address/0xD75c20B20Ca9E6B6A00b5a0F4425e40fa0063C74

Token:
https://rinkeby.etherscan.io/token/0xd75c20b20ca9e6b6a00b5a0f4425e40fa0063c74



- ERC-721 Token Name
    - ```Star Token```
- ERC-721 Token Symbol
    - ```STO```
- Token Address on the rinkeby Network
     **0xD75c20B20Ca9E6B6A00b5a0F4425e40fa0063C74**

     ```
     2_initial_migration.js


   Replacing 'StarNotary'
  
   > transaction hash:    0x7b2133017cf1390d8f1576f3e3c193b4fd5320fa864a00678487f700e08940e5
   > Blocks: 0            Seconds: 12
   > contract address:    0xD75c20B20Ca9E6B6A00b5a0F4425e40fa0063C74
   > account:             0xA3d5B48862A97E24b9De2602494b5dcCf5189e22
   > balance:             18.678703461
   > gas used:            2357788
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.02357788 ETH

   > Saving artifacts
  
   > Total cost:          0.02357788 ETH

   ```


### Snapshot

![Creating a new star](https://github.com/axelgalicia/blockchain-notary-service/blob/master/images/screenshot1.jpg)

## Frameworks and tools used on this application:
    
- Truffle
- Infura
- Solidity
- Metamask
- Webpack
- Web3


    **Author**: Axel Galicia, axelgalicia@gmail.com
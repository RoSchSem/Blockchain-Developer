# Udacity - Blockchain Capstone

This project shows how to use Ethereum, Solidity, Rinkeby Network, ZoKrates and OpenSea to create a mintable verifiable ERC721 Token that uses zkSNARKs to prove someone has a title without revealing anything about the property.

For the project we have to use all the information from former lesson along the udacity blockchain course.
Additionally we use Zokrates and the online blockchain marketplace Opensea.


# Project Resources
- Remix - Solidity IDE
- Visual Studio Code
- Truffle Framework
- Ganache - One Click Blockchain
- Open Zeppelin
- Interactive zero knowledge 3-colorability demonstration
- Docker
- ZoKrates
- Oversea Rinkeby - https://rinkeby.opensea.io/assets

# Installation
### Install packages
```
npm install
```

Please go to folder eth-contracts
```
cd eth-contracts
```


### Compile contracts
```
truffle compile
```

### Migrate contracts
```
truffle migrate
```


### Test contracts
```
truffle test
```

---------------------------------------------
![Screenshot](https://github.com/RoSchSem/Blockchain-Developer/blob/master/Project%208/pic1_truffle_test.PNG "Test")
---------------------------------------------
## Addresses of deployed contracts in Rinkeby
### Account address (current owner of the tokens)
```
0x475a5faf25eb6d8343fec0d9fcfab1f00a35763e
```

![Screenshot](https://github.com/RoSchSem/Blockchain-Developer/blob/master/Project%208/pic1_Etherscan_addressowner.png "Current owner")

### SquareVerifier contract address
```
0xA4d6B95e313c00910Ef400B17E96773eAc7F8E1A
```
### SolnSquareVerifier contract address
```
0x7412A6a84E8BFD9bDAaa38213019CD244124Ee10
```

---------------------------------------------
## OpenSea storefront (Udacity - Real Estate)

### Real Estate objects in OpenSea

https://rinkeby.opensea.io/assets/0xefbcdac3ab154968f4ea3ab2766c7fe39bf1c4a6/1
https://rinkeby.opensea.io/assets/0xefbcdac3ab154968f4ea3ab2766c7fe39bf1c4a6/2
https://rinkeby.opensea.io/assets/0xefbcdac3ab154968f4ea3ab2766c7fe39bf1c4a6/3
https://rinkeby.opensea.io/assets/0xefbcdac3ab154968f4ea3ab2766c7fe39bf1c4a6/4
https://rinkeby.opensea.io/assets/0xefbcdac3ab154968f4ea3ab2766c7fe39bf1c4a6/5



![Screenshot](https://github.com/RoSchSem/Blockchain-Developer/blob/master/Project%208/pic1_oversea.png "Storefront")



## Transaction example
![Screenshot](https://github.com/RoSchSem/Blockchain-Developer/blob/master/Project%208/pic2_oversea.png "example #1")
![Screenshot](https://github.com/RoSchSem/Blockchain-Developer/blob/master/Project%208/pic3_oversea.png "example #2")

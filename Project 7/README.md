# FlightSurety

FlightSurety is a sample application project for Udacity's Blockchain course.

## Prerequesites

* NodeJS (v12.13.0)
* Truffle (v5.0.8)
* Ganache CLI v6.7.0 (ganache-core: 2.8.0)

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`

## Run Ganache

Set ganache-cli with 50 accounts (use mnemonic from [truffle.js](./truffle.js)) and
balance of 500 ETH and gasLimit 9999999

    ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" - a 50 --gasLimit 9999999

## Develop Contracts

`truffle compile`

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js --show-events`
`truffle test ./test/oracles.js --show-events`

To use the dapp:

`truffle migrate --network develop`
`npm run dapp`

To view dapp:

`http://localhost:8000`

## Develop Server

`npm run server`
`truffle test ./test/oracles.js`

## Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


## Resources
* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)

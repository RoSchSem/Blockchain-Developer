/*========= Blockchain - build up and validation ======
 Build up constructor for blockchain and validate it  |
=======================================================*/


// Import dependencies
const SHA256 = require('crypto-js/sha256')
const Block = require('./block')
const Database = require('./database')



/*========= Class Blockchain =======================
 Build up constructor for blockchain (as a class)  |
===================================================*/

class Blockchain {
    constructor() {
      this.database = new Database();
      /*
       - Persist the Genesis BLock as the first block in the blockchain.
      */
      this.getBlockHeight().then((height) => {
        if (height === -1) {
          this.addBlock(new Block("Genesis block")).then(() => console.log("Genesis block created......"))
        }
      })
    }

    // Storaging new block in the blockchain 
    async addBlock(newBlock) {
        const height = parseInt(await this.getBlockHeight())
    
        newBlock.height = height + 1
        newBlock.time = new Date().getTime().toString().slice(0, -3)
    
        if (newBlock.height > 0) {
          const prevBlock = await this.getBlock(height)
          newBlock.previousBlockHash = prevBlock.hash
          console.log(`Previous hash: ${newBlock.previousBlockHash}`)
        }

        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()
        console.log(`New hash: ${newBlock.hash}`)

        await this.database.addBlockToDB(newBlock.height, JSON.stringify(newBlock))
    } 

    // Get block height in the blockchain
    async getBlockHeight() {
        return await this.database.getBlockHeightFromDB()
    }

    // Get block in the the blockchain
    async getBlock(blockHeight) {
        return JSON.parse(await this.database.getBlockFromDB(blockHeight))
    }


    // Validate block in the blockchain
    async validateBlock(blockHeight) {
        let block = await this.getBlock(blockHeight);
        let blockHash = block.hash;
        block.hash = '';
        
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
    
        if (blockHash === validBlockHash) {
            return true;
          } else {
            console.log(`Block #${blockHeight} invalid hash: ${blockHash} not equal to ${validBlockHash}`);
            return false;
        }
    }

    // Validate blockchain
    async validateChain() {
        let errorLog = []
        let previousHash = ''
        let isValidBlock = false
    
        const heigh = await this.database.getBlockHeightFromDB()
    
        for (let i = 0; i <= heigh; i++) {
          console.log(`Validating the block with heigh = ${i}`)
          this.getBlock(i).then((block) => {
            isValidBlock = this.validateBlock(block.height)
    
            if (!isValidBlock) {
              errorLog.push(i)
            } 
    
            if (block.previousBlockHash !== previousHash) {
              errorLog.push(i)
            }
    
            previousHash = block.hash
    
            if (i === (heigh -1)) {
              if (errorLog.length > 0) {
                console.log(`Block errors = ${errorLog.length}`)
                console.log(`Blocks: ${errorLog}`)
              } else {
                console.log('No errors detected')
              }
            }
          })
        }
      }


    async getChain(){
        const chain = await this.database.getChainFromDB()
        return chain
    }
}


/*========= Export Module=====================
| Export "Blockchain" as a module            |
==============================================*/

module.exports = Blockchain




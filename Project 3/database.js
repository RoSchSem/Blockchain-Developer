// Import dependencies

const level = require('level');


/*========= Class Database=======================
| Constructor to create a database (as a class) |
================================================*/

class Database {
    constructor (data) {
      this.chainDB = './chaindata',
      this.db = level(this.chainDB)
    }

    // Add on block inside the database
    addBlockToDB(key, value) {
        return new Promise((resolve, reject) => {
            this.db.put(key, value, (error) => {
                if (error) {
                    reject(error)
                }

                console.log("Block added: "+key)
                resolve("Block added: " +key)
            })
        })
    }

    // get block from database
    getBlockFromDB(key) {
        return new Promise((resolve, reject) => {
            this.db.get(key, (error, value) => {
                if (error) {
                    reject(error)
                }
                resolve(value)
            })
        })
    }

    // get block height from database
    getBlockHeightFromDB() {
        return new Promise((resolve, reject) => {
            let height = -1
            this.db.createReadStream().on('data', (data) => {
                height++
                }).on('error', (error) => {
                    reject(error)
                }).on('close', () => {
                    resolve(height)
                    })
            })
        }

    // get chain for all stored blocks in the database
    getChainFromDB() {
        return new Promise((resolve, reject) => {
            let chain = []
            this.db.createReadStream()
            .on('data', data => {
                chain.push(JSON.parse(data.value))
            })
            .on('error', err => {
                reject(err)
            })
            .on('close', () => {
                resolve(chain)
            })
        })
    }
}


/*========= Export Module=====================
| Export "Database" as a module                  |
==============================================*/
module.exports = Database

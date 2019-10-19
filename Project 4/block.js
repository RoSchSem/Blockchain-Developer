/*========= Class Block ======================
| Constructor to create a block (as a class) |
==============================================*/

class Block {
  constructor (data) {
    this.hash = '',
    this.height = 0,
    this.body = data,
    this.time = 0,
    this.previousBlockHash = ''
  }
}

/*========= Export Module=====================
| Export "Block" as a module                  |
==============================================*/
module.exports = Block
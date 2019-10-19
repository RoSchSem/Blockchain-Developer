/*=============== Import Express ======================
|        https://github.com/expressjs/express         |
======================================================*/

const compression = require('compression')
const express = require('express')
const app = express()

/*=============== Import classes ======================
 Import classes for Block, Blockchain and Database    |
=======================================================*/

const Block = require('./block')
const Blockchain = require('./blockchain')
const blockchain = new Blockchain()
const Database = require('./database')
const StarValidation = require('./validation')

/*=============== Import BodyParser====================
|        https://github.com/expressjs/body-parser     |
======================================================*/

const bodyParser = require('body-parser')

/*=============== Create the Server====================================
|        https://pusher.com/tutorials/http-response-codes-part-2      |
|        https://restfulapi.net/http-status-codes/                    |
=======================================================================*/

app.use(compression())
app.listen(8000, () => console.log('App is running on port 8000'))
app.use(bodyParser.json())

/*=============== Check Endpoint====================================
|                          |
=======================================================================*/

//app.get('/', (req, res) => res.status(404).json({ 
  // "status": 404,
  // "message": "Please check endpoints" 
  //}))

/*=============== Validation =================
           Valdidation of the address         |
=============================================*/
validateAddress = async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req)
    starValidation.validateAddress()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

validateSignatureParameter = async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req)
    starValidation.validateSignature()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

validateNewStar= async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req)
    starValidation.validateNewStar()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}




// Web API post endpoint validates request with JSON response.
app.post('/requestValidation', async (req, res) => {
    const starValidation = new StarValidation(req)
    const address = req.body.address

    try {
      data = await starValidation.getPendingAddressRequest(address)
    } catch (error) {
      data = await starValidation.saveNewRequestValidation(address)
    }

    res.json(data)
})

// Web API post endpoint validates message signature with JSON response
app.post('/message-signature/validate', async (req, res) => {
  const starValidation = new StarValidation(req)

  try {
    starValidation.validateAddressAndSignature()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
    return
  }

  try {
    const { address, signature } = req.body
    const response = await starValidation.validateMessageSignature(address, signature)

    if (response.registerStar) {
      res.json(response)
    } else {
      res.status(401).json(response)
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error
    })
  }
})

// GET Block endpoint using URL path with block height parameter. Preferred URL path http://localhost:8000/block/{BLOCK_HEIGHT}
app.get('/block/:height', async (req, res) => {
  try {
    const response = await blockchain.getBlock(req.params.height)
    res.send(response)
  } catch (error) {
    res.status(404).json({ 
      "status": 404,
      "message": 'This block is not found' 
    })
  }
})


app.get('/chain', async (req, res) => {
  try {
    const chain = await blockchain.getChain()
    res.json({
      success: true,
      data: chain
    });
  } catch (e) {
    res.statusCode = 500;
    res.json({
      success: false,
      message: "Sorry, but I cannot proccess the information"
    });
  }
})


// Get star block by wallet address (blockchain identity) with JSON response.
app.get('/stars/address:address', async (req, res) => {
  try {
        const address = req.params.address.slice(1)
        const response = await blockchain.getBlocksByAddress(address)

    res.send(response)
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: 'Block not found'
    })
  }
})

// Get star block by hash with JSON response.
app.get('/stars/hash:hash', async (req, res) => {
  try {
    const hash = req.params.hash.slice(1)
    const response = await blockchain.getBlockByHash(hash)

    res.send(response)
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: 'Block not found'
    })
  }
})

// POST Block endpoint using key/value pair within request body.
//   POST URL path: http://localhost:8000/block
//   Content-Type: application/json
//   Request body: {"body":"block body contents"}
app.post('/block', async (req, res) => {
    const starValidation = new StarValidation(req)
    try {
      const isValid = await starValidation.isValid()
      if (!isValid) {
        throw 'Signature is not valid'
      }
    } catch (error) {
      res.status(401).json({
        status: 401,
        message: error.message
      })
      return
    }
    const body = { address, star } = req.body
    const story = star.story

    body.star = {
      dec: star.dec,
      ra: star.ra,
      story: new Buffer(story).toString('hex'),
      mag: star.mag,
      con: star.con
    }
    await blockchain.addBlock(new Block(body))
    const height = await blockchain.getBlockHeight()
    const response = await blockchain.getBlock(height)
    starValidation.invalidate(address)
    res.status(201).send(response)
})
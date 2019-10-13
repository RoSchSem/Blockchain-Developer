/*=============== Import classes ======================
 Import classes for Block, Blockchain and Database    |
=======================================================*/

const Block = require('./block')
const Blockchain = require('./blockchain')
const blockchain = new Blockchain()


/*=============== Import Express ======================
|        https://github.com/expressjs/express         |
======================================================*/

const express = require('express')
const app = express()

/*=============== Import BodyParser====================
|        https://github.com/expressjs/body-parser     |
======================================================*/

const bodyParser = require('body-parser')

/*=============== Create the Server====================================
|        https://pusher.com/tutorials/http-response-codes-part-2      |
|        https://restfulapi.net/http-status-codes/                    |
=======================================================================*/


app.listen(8000, () => console.log('API ist running on port 8000'))
app.use(bodyParser.json())


/*=============== Routing=======================================
|       https://expressjs.com/de/starter/basic-routing.html    |
|       https://expressjs.com/de/guide/routing.html            |
================================================================*/


// Endpoint GET - by /block/{height}
app.get('/block/:height', async (req, res) => {
    try {
        const response = await blockchain.getBlock(req.params.height)
        res.send(response)
    } catch (error) {
        res.status(404).json({
            "status": 404,
            "message": "The block with the height " + req.params.height + " can not be found"
        })
    }
})

// Endpoint POST - by /block
app.post('/block', async (req, res) => {
    if (req.body.body === '' || req.body.body === undefined) {
        res.status(400).json({
            "status": 400,
            message: "To create a new block - we need more information about the body"
        })
    }
    
    await blockchain.addBlock(new Block(req.body.body))
    // Get the last block height
    const height = await blockchain.getBlockHeight()
    // Get the last block by height
    const response = await blockchain.getBlock(height)
    // Return the new block as response
    res.send(response)
})


// Endpoint GET - by /chain
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

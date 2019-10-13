# Project 3: "Connect Private Blockchain to Front-End Client via API's"

In the project there was the challenge to biuld a RESTful API using a Node.js framework.
Create a API with GET and POST to create new blocks, get blocks by height and get information about the chain.


## Getting Started


These instructions will get you a copy of the project up and running on your local 
machine for development and testing purposes.

1. download or clone the respository to a local folder.
2. open terminal or command prompt on your desktop/IDE
3. run `npm install` to install dependencies from package.json
4. run `node app.js`
5. Please go to your local port 8000. As an alternative you can
   test with postman. In both cases - please keep port 8000 free for use.



### Prerequisites
Framework (latest version)
```
express.js
```

In addition you need following software modules (lastest version)
```
crypto.js
body-parser
level
````

## Testing

For the testing I use postman. 
After starting the application on your command prompt/terminal with "node app.js"

You will receive folling information
```
API ist running on port 8000
app.js:29
New hash: 0b6afaf629bc2dfee87b7c4305a06ebdc8f0db8add6a053b737330dd6059f82c
blockchain.js:44
Block added: 0
database.js:24
Genesis block created......
```

After this please go to postman.

### Creating a new block

Endpoint: POST
Address: http://localhost:8000/block

Please select "BODY" in the menu und "JSON (application/json)" and "raw"
in the sub-menu.

Please add on body like this in the editor/command field: 
```
{
    "body": "Test-Drive - new block"
}
```
Afterwards you will receive data like this
```
{
    "hash": "9c75c2d650cbde677a0e72f5f2b8f0231e92949021d40e0d4e9a2b45cee51dfe",
    "height": 1,
    "body": "Test-Drive - new block",
    "time": "1570983074",
    "previousBlockHash": "0b6afaf629bc2dfee87b7c4305a06ebdc8f0db8add6a053b737330dd6059f82c"
}
```

If you create a block again the result will show like this:
```
{
    "hash": "194ced6c23cd4bf7617dd1c09f6bec2cd1ae107a93e7447739749762e5e46887",
    "height": 2,
    "body": "Test-Drive - new block #2",
    "time": "1570983160",
    "previousBlockHash": "9c75c2d650cbde677a0e72f5f2b8f0231e92949021d40e0d4e9a2b45cee51dfe"
}
```

## Get block by height

Endpoint: GET
Address: http://localhost:8000/block/{height}

e.g. address: http://localhost:8000/block/3

```
{
    "hash": "c3448a688e174ea3d3a6017e82495f10ca725e7ae000571d5becb413b8d1654d",
    "height": 3,
    "body": "Test-Drive - new block #3",
    "time": "1570984455",
    "previousBlockHash": "194ced6c23cd4bf7617dd1c09f6bec2cd1ae107a93e7447739749762e5e46887"
}
```

## Get all blocks in the blockchain

Endpoint: GET
Address: http://localhost:8000/chain

```
{
    "success": true,
    "data": [
        {
            "hash": "0b6afaf629bc2dfee87b7c4305a06ebdc8f0db8add6a053b737330dd6059f82c",
            "height": 0,
            "body": "Genesis block",
            "time": "1570983028",
            "previousBlockHash": ""
        },
        {
            "hash": "9c75c2d650cbde677a0e72f5f2b8f0231e92949021d40e0d4e9a2b45cee51dfe",
            "height": 1,
            "body": "Test-Drive - new block",
            "time": "1570983074",
            "previousBlockHash": "0b6afaf629bc2dfee87b7c4305a06ebdc8f0db8add6a053b737330dd6059f82c"
        },
        {
            "hash": "194ced6c23cd4bf7617dd1c09f6bec2cd1ae107a93e7447739749762e5e46887",
            "height": 2,
            "body": "Test-Drive - new block #2",
            "time": "1570983160",
            "previousBlockHash": "9c75c2d650cbde677a0e72f5f2b8f0231e92949021d40e0d4e9a2b45cee51dfe"
        },
        {
            "hash": "c3448a688e174ea3d3a6017e82495f10ca725e7ae000571d5becb413b8d1654d",
            "height": 3,
            "body": "Test-Drive - new block #3",
            "time": "1570984455",
            "previousBlockHash": "194ced6c23cd4bf7617dd1c09f6bec2cd1ae107a93e7447739749762e5e46887"
        }
    ]
}
```

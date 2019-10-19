# Project 4: "Build a Private Blockchain Notary Service"

In the project there was the challenge to build a private blockchain notary service.
This project was created as an add-on to the udacity project 3.


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
bitcoinjs-lib
bitcoinjs-message
body-parser
compression
crypto-js
express
hex2ascii
level
````

If the modules are not installed, please type in the terminal
```
npm install {software module}
```

## Testing

For the testing I use postman. 
After starting the application on your command prompt/terminal with "node app.js"

You will receive folling information
```
API ist running on port 8000
app.js:29
New hash: 0b6afaf629bc2dfee87b7cxxxxxxxxxxxxxxxxxxxxxxxxx737330dd6059f82c
blockchain.js:44
Block added: 0
database.js:24
Genesis block created......
```

After this please go to postman.

### Testing POST Endpoint for request validation

```
http://localhost:8000/requestValidation
```

please use your address (e.g. from you 1st task)

fill in "body" with JSON and press send in postman
```
{
    "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp"
}
```

The result is
```
{
    "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
    "message": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp:1571505707:starRegistry",
    "requestTimeStamp": 1571505707,
    "validationWindow": 300
}
```


### Testing POST Endpoint with message signature validation

please copy the "message" and go to your electrum account
with your address and the message - please sign with your signature.

The result is e.g. 
```
"H8L1SY9Cw38LST86RL3kNCGqHB90XDAmJsXhKXjkdkssQV5oIhEJ/Hl2hTPPVxrLeeorz7n1Fqh1tnpHjvSNgEk="
```

please go to postman and open a new POST Endpoint
```
http://localhost:8000/message-signature/validate
```

in the "body" with JSON please add you address and the signature and press send.
```
{
    "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
    "signature": "H8L1SY9Cw38LST86RL3kNCGqHB90XDAmJsXhKXjkdkssQV5oIhEJ/Hl2hTPPVxrLeeorz7n1Fqh1tnpHjvSNgEk="
}
```

the result is the validation of your message signature
```
{
    "registerStar": true,
    "status": {
        "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
        "message": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp:1571504941:starRegistry",
        "requestTimeStamp": 1571504941,
        "validationWindow": 273,
        "messageSignature": "valid"
    }
}
```
### Testing POST Endpoint for adding a new block and your star data

for the star data, please go to "www.google.com/sky" to select a star and 
its dec (declination) and ra (right ascension) for the coordinates of the star.
Dec and ra correspond to longitude and longitude on Earth.

I selected the north star - Polaris - with 
ra+8: 02h 31m 49.09s
dec: +89° 15′ 50.8″

please go to postman and open a new POST Endpoint
```
http://localhost:8000/block
```
in the "body" with JSON please add you address and the star-information and press send
```
{
  "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
  "star": {
    "dec": "+89° 15' 50.8",
    "ra": "02h 31m 49.09s",
    "story": "Found star using https://www.google.com/sky/"
  }
}
```
the result is a new block with the star information and the time when the block
was created.

```
{
    "hash": "1e71c5b0ae38b5b962a44a26e601086b91c0946bb2178214c3f97f8794c0e316",
    "height": 7,
    "body": {
        "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
        "star": {
            "dec": "+89° 15' 50.8",
            "ra": "02h 31m 49.09s",
            "story": "466f756e64207374617220756473696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1571513676",
    "previousBlockHash": "79f9b00233ea48a6bb7f09907bdff5dad89d4945352b3fafc48373582e22758c"
}
```
### Testing GET Endpoint with the hash

To test, the information about the block and the star please go
to postman and open a new GET Endpoint
```
http://localhost:8000/stars/hash:[hash]
```
bring the hash-information in the URL-address and press send

```
http://localhost:8000/stars/hash:1e71c5b0ae38b5b962a44a26e601086b91c0946bb2178214c3f97f8794c0e316
```
The result is the block and star information

```
{
    "hash": "1e71c5b0ae38b5b962a44a26e601086b91c0946bb2178214c3f97f8794c0e316",
    "height": 2,
    "body": {
        "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
        "star": {
            "dec": "+89° 15' 50.8",
            "ra": "02h 31m 49.09s",
            "story": "466f756e64207374617220756473696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1571513676",
    "previousBlockHash": "79f9b00233ea48a6bb7f09907bdff5dad89d4945352b3fafc48373582e22758c"
}
```

### Testing GET Endpoint with all blocks in the chain by your address

To test, the information about all blocks in the chain by address of
the wallet owner, please go to postman and open a new GET Endpoint with

```
http://localhost:8000/stars/address:[address]
```
bring the address-information in the URL-address and press send

```
http://localhost:8000/stars/address:178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp
```

The result are all blocks by the address in the blockchain
```
[
    {
        "hash": "79f9b00233ea48a6bb7f09907bdff5dad89d4945352b3fafc48373582e22758c",
        "height": 1,
        "body": {
            "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
            "star": {
                "dec": "-15° 36' 21.3",
                "ra": "17h 12m 3.0s",
                "story": "78787878787878787878787878787878466f756e64207374617220756473696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
            }
        },
        "time": "1571504974",
        "previousBlockHash": "8ba6cfe0e9d1fc9f9c4fcc5838bfbe88724e366a656289a04b5d18b60e0d9ce2"
    },
    {
        "hash": "1e71c5b0ae38b5b962a44a26e601086b91c0946bb2178214c3f97f8794c0e316",
        "height": 2,
        "body": {
            "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
            "star": {
                "dec": "+89° 15' 50.8",
                "ra": "02h 31m 49.09s",
                "story": "466f756e64207374617220756473696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
            }
        },
        "time": "1571513676",
        "previousBlockHash": "79f9b00233ea48a6bb7f09907bdff5dad89d4945352b3fafc48373582e22758c"
    }
]

```
### Testing GET Endpoint a specific block by its height

To test a block by its height information (e.g. 2) please open a new GET
Endpoint in postman and press send

```
http://localhost:8000/block/:height
```

the result is the block and star information for the specific selected block

```
{
    "hash": "54141b0102448afbc3dbf8364db7409816751454627384a207ef627aa282a18e",
    "height": 2,
    "body": {
        "address": "178L6yf53XPxxxxxAC9QjzWPvYy7eZUBPMp",
        "star": {
            "dec": "-15° 36' 21.3",
            "ra": "17h 12m 3.0s",
            "story": "78787878787878787878787878787878466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1571500663",
    "previousBlockHash": "db977d770a53194040b3a676d13c9079f7a47ddce3830506375e8494b8c571d2"
}
```


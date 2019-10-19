const level = require('level');



const stardb = require('level')('./star')
const bitcoinMessage = require('bitcoinjs-message')

class StarValidation {
  constructor (req) {
    this.req = req
  }

  validateAddress() {
    if (!this.req.body.address) {
      throw 'please fill out your address'
    }
    return true
  }

  validateAddressAndSignature() {
    if (!this.validateAddress() || !this.req.body.signature) {
      throw 'please fill out you address and your signature'
    }
  }

  validateNewStar() {
    const MAX_STORY_BYTES = 500
    const { theStar } = this.req.body
    const { dec, ra, story} = theStar
	  
    if (!this.validateAddress() || !this.req.body.theStar) {
      throw 'Please fill out your address + star information'
    }

    // Validate ra, dec, story
    if (typeof dec !== 'string' || typeof ra !== 'string' || typeof story !== 'string' || !dec.length || !ra.length || !story.length) {
      throw new Error("This should include non-empty string properties 'dec', 'ra' and 'story'")
    }
	
	// Story is limited to 250 words (500 bytes) ASCII text
    if (new Buffer(story).length > MAX_STORY_BYTES) {
      throw new Error('Sorry - the size of the story is > 500 bytes')
    }

    const isASCII = ((str) => /^[\x00-\x7F]*$/.test(str))

    if (!isASCII(story)) {
      throw new Error('There are no ASCII letters')
    }
  }

  isValid() {
    return stardb.get(this.req.body.address)
      .then((value) => {
        value = JSON.parse(value)
        return value.messageSignature === 'valid'
      })
      .catch(() => {throw 'you are not authorized'})
  }

  invalidate(address) {
    stardb.del(address)
  }

  async validateMessageSignature(address, signature) {
    return new Promise((resolve, reject) => {
      stardb.get(address, (error, value) => {
        if (value === undefined) {
          return reject(new Error('Not found'))
        } else if (error) {
          return reject(error)
        }

        value = JSON.parse(value)

        if (value.messageSignature === 'valid') {
          return resolve({
            registerStar: true,
            status: value
        }) 
        } else {
          const nowSubFiveMinutes = Math.floor(Date.now()/1000) - (5 * 60)
          const isExpired = value.requestTimeStamp < nowSubFiveMinutes
          let isValid = false
  
          if (isExpired) {
              value.validationWindow = 0
              value.messageSignature = 'Validation window was expired'
          } else {
              value.validationWindow = value.requestTimeStamp - nowSubFiveMinutes
  
              try {
                isValid = bitcoinMessage.verify(value.message, address, signature)
              } catch (error) {
                isValid = false
              }
            
              value.messageSignature = isValid ? 'valid' : 'invalid'
          }
  
          stardb.put(address, JSON.stringify(value))
  
          return resolve({
              registerStar: !isExpired && isValid,
              status: value
          }) 
        }
      })
    })
  }

  saveNewRequestValidation(address) {
    const timestamp = Math.floor(Date.now()/1000)
    const message = `${address}:${timestamp}:starRegistry`
    const validationWindow = 300
    const data = {
      address: address,
      message: message,
      requestTimeStamp: timestamp,
      validationWindow: validationWindow
    }
    stardb.put(data.address, JSON.stringify(data))
    return data
  }

  async getPendingAddressRequest(address) {
    return new Promise((resolve, reject) => {
      stardb.get(address, (error, value) => {
        if (value === undefined) {
          return reject(new Error('Not found'))
        } else if (error) {
          return reject(error)
        }

        value = JSON.parse(value)
        const nowSubFiveMinutes = Math.floor(Date.now()/1000) - (5 * 60)
        const isExpired = value.requestTimeStamp < nowSubFiveMinutes

        if (isExpired) {
            resolve(this.saveNewRequestValidation(address))
        } else {
          const data = {
            address: address,
            message: value.message,
            requestTimeStamp: value.requestTimeStamp,
            validationWindow: value.requestTimeStamp - nowSubFiveMinutes
          }
          resolve(data)
        }
      })
    })
  }






}
  
module.exports = StarValidation
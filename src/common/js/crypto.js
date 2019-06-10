// import CryptoJS from 'crypto-js'
import sha256 from 'js-sha256'

export function encryptSHA256(hashValue, votes) {
  let _checkData = {}  
  let encrypted = sha256(hashValue)
  return {
    sha256: encrypted,
    sha256Slice: encrypted.slice(0, 12),
    decimalSystem: parseInt(encrypted.slice(0, 12), 16).toLocaleString(),
    votes: votes,
    prizeNumber: parseInt(encrypted.slice(0, 12), 16) % votes
  }
}


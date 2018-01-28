const level = require('level')
const hyperlog = require('hyperlog')
const to  = require('to2')

const db = level('.ws.db')

const branches = db.createReadStream({
    gt: '!branch!'
  , lt: '!branch!~'
})

branches.pipe(to.obj(function(chunk, enc, next) {
  console.log(chunk)
  next()
}))

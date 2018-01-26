const level = require('level')
const hyperlog = require('hyperlog')
const to = require('to2')

const db = level('./.ws.db')
const log = hyperlog(db, {valueEncoding: 'json'})
const stream = log.createReadStream()

stream.pipe(to.obj(print))

function print(chunk, enc, next) {
  console.log(chunk)
  next()
}

const level = require('level-js')
const hyperlog = require('hyperlog')
const wsock = require('websocket-stream')

const db = level('./browser.db')
const log = hyperlog(db, {valueEncoding: 'json'})
const stream = wsock('ws://localhost:5000')

stream.pipe(log.replicate({live: true})).pipe(stream)

module.exports = state

function state(state, emitter) {
  state.count = 0
  state.heads = []

  emitter.on('DOMContentLoaded', function() {
    emitter.on('increment', (count) => {
      state.count += count
      emitter.emit('render')
    })
  })
  emitter.on('new:head', () => {
    log.heads((err, heads) => {
      state.heads = heads
      emitter.emit('render')
    })
  })
  stream.on('data', data => emitter.emit('new:head'))
}

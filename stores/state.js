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
  state.latest = 'No Posts Found'

  emitter.on('DOMContentLoaded', function() {
    emitter.on('increment', (count) => {
      state.count += count
      emitter.emit('render')
    })

    emitter.on('add:post', post => {
//      state.latest = post
//      emitter.emit('render')
      log.append({ post }, (err, node) => {
          state.latest = 'blah blah blah'
          emitter.emit('render')
        }
      )
    })
  })
}

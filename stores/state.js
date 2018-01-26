const level = require('level-browserify')
const hyperlog = require('hyperlog')
const wsock = require('websocket-stream')

const db = level('./browser.db')
const log = hyperlog(db, {valueEncoding: 'json'})
const stream = wsock('ws://localhost:5000')

stream.pipe(log.replicate({live: true})).pipe(stream)

module.exports = state

function state(state, emitter) {
  state.count = 0
  state.latest = 'No post yet'

  emitter.on('DOMContentLoaded', function() {

    emitter.on('add:post', addPost)
    emitter.on('get:prev', getPrev)
    emitter.on('get:next', getNext)

    function addPost(msg) {
      const message = {
          post: msg.post
        , title: msg.title
        , timestamp: new Date().toISOString()
      }

      log.append({ message }, async(err, node) => {
        if(err) return console.error(err)
        try {
          await db.put(node.links[0], node.key)
        } catch(err) {
          console.error(err)
        }
        state.latest = node
        emitter.emit('render')
      })
    }

    function getPrev(prev) {
      log.get(prev, (err, node) => {
        if(err) return console.error(err)
        state.latest = node
        emitter.emit('render')
      })
    }

    function getNext(current) {
      db.get(current, (err, val) => {
        if(err) return console.error(err)
        log.get(val, (err, node) => {
          if(err) return console.error(err)
          state.latest = node
          emitter.emit('render')
        })
      })
    }
  })
}

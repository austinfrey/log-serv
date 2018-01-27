const level = require('level-browserify')
const hyperlog = require('hyperlog')
const wsock = require('websocket-stream')
const to = require('to2')

const db = level('./browser.db')
const log = hyperlog(db, {valueEncoding: 'json'})
const stream = wsock('ws://localhost:5000')

stream.pipe(log.replicate({live: true})).pipe(stream)

module.exports = state

function state(state, emitter) {
  state.count = ['hey', 'ho', 'lets', 'go']
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
          const date = new Date().toISOString()
          await db.put(`!branch!${node.links[0]}!${date}`, node.key)
        } catch(err) {
          console.error(err)
        }
        state.latest = []
        assembleLatest
      })
    }

    function assembleLatest(link) {
      const logKeys = db.createValueStream({
          gt: `!branch!${link}!`
        , lt: `!branch!${link}!~`
      })
      logKeys.pipe(to(pushNode))
      logKeys.on('end', () => emitter.emit('render'))
    }

    function pushNode(chunk, enc, next) {
      log.get(chunk, (err, node) => {
        err ? console.err(err) : state.latest.push(node)
        next()
      })
    }

    function getPrev(prev) {
      getNode(prev)
    }

    function getNext(current) {
      db.get(current, (err, val) => {
        if(err) return console.error(err)
        getNode(val)
      })
    }

    function getNode(key) {
      log.get(key, (err, node) => {
        if(err) return console.error(err)
        state.latest = node
        emitter.emit('render')
      })
    }
  })
}

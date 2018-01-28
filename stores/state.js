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
  state.msgTitle = ''
  state.replyLink = null
  state.latest = 'No post yet'
  state.branches = []

  emitter.on('DOMContentLoaded', function() {

    emitter.on('add:post', addPost)
    emitter.on('add:reply', addReply)
    emitter.on('get:prev', getPrev)
    emitter.on('get:next', getNext)

    function addPost(msg) {
      const message = {
          post: msg.post
        , title: msg.title
        , timestamp: new Date().toISOString()
      }

      log.add(state.replyLink,{ message }, async(err, node) => {
        if(err) return alert(err)

        state.replyLink = null
        try {
          const date = new Date().toISOString()
          await db.batch([
            {
                type: 'put'
              , key: node.links[0]
              , value: node.key
            }
          ])
        } catch(err) {
          alert(err)
        }
        state.latest = []
        state.latest.push(node)
        emitter.emit('render')
      })
    }

    function addReply(msg) {
      const state.replyLink = msg.link
      state.msgTitle = `RE: ${msg.title}`
      emitter.emit('render')
    }

    function assembleBranches(link) {
      const logKeys = db.createValueStream({
          gt: `!branch!${link}!`
        , lt: `!branch!${link}!~`
      })
      logKeys.pipe(to(pushNode))
      logKeys.on('end', () => emitter.emit('render'))
    }

    function pushNode(chunk, enc, next) {
      log.get(chunk, (err, node) => {
        err ? alert(err) : state.branches.push(node)
        next()
      })
    }

    function getPrev(prev) {
      state.latest = []
      getNode(prev)
    }

    function getNext(current) {
      db.get(current, (err, val) => {
        if(err) return alert(err)
        state.latest = []
        getNode(val)
      })
    }

    function getNode(key) {
      log.get(key, (err, node) => {
        if(err) return alert(err)
        state.latest.push(node)
        emitter.emit('render')
      })
    }
  })
}

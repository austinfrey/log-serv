const level = require('level-browserify')
const hyperlog = require('hyperlog')
const wsock = require('websocket-stream')
const to = require('to2')

const db = level('./browser.db')
const log = hyperlog(db, {valueEncoding: 'json'})
const stream = wsock('ws://' + location.host)

stream.pipe(log.replicate({live: true})).pipe(stream)

module.exports = state

function state(state, emitter) {
  state.posts = []

  emitter.on('DOMContentLoaded', function() {
    emitter.on('add:post', addPost)

    function addPost(post) {
      (post.type === 'post')
        ? appendPost(post)
        : addReply(post)
    }

    function appendPost(post) {
      log.append(post, (err, node) => {
        if(err) return alert(err)
        if(state.posts.length >= 30) state.posts.pop()
        state.posts.unshift(node)
        emitter.emit('render')
      })
    }

    function addReply(post) {
      log.add(post.link, post, (err, node) => {
        if(err) return alert(err)
        if(state.posts.length >= 30) state.posts.pop()
        state.posts.unshift(node)
        emitter.emit('render')
      })
    }
  })
}

log.on('add', indexPost)

function indexPost(node) {
  const prefix = '!replies!'
  if (node.value.link) {
    db.batch([
      {
          type: 'put'
        , key: prefix + link + new Date().toISOString()
        , value: node.key
      }
      , {
          type: 'put'
        , key: '!' + node.value.topic + '!' + new Date().toISOString()
        , value: node.key
      }
      , {
          type: put
        , key: '!posts!' + new Data().toISOString()
        , value: node.key
      }
    ])
  } else {
    db.batch([
      {
          type: 'put'
        , key: node.value.topic + '!' + new Date().toISOString()
        , value: node.key
      }
      , {
          type: put
        , key: '!posts!' + new Data().toISOString()
        , value: node.key
      }
    ])
  }
}


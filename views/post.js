const html = require('choo/html')

module.exports = post

function post (state, emit) {
  return html`
    <div>
      <h1 class="ma2">New Post</h1>
      <input id="msg_topic" class="w-75 mh2 mb2" placeholder="#Topic">
      <textarea id="msg_content" class="w-100 mh2" placeholder="Post"></textarea><br>
      <div>
        <button onclick=${submitPost} class="mt2 ph4 pv2">Post</button>
      </div>
    </div>
  `

  function submitPost() {
    const topic = document.getElementById('msg_topic').value
    const content = document.getElementById('msg_content').value

    emit('add:post', {
        topic
      , content
      , type: 'post'
    }) //TODO add ability to send link back for replies
  }
}

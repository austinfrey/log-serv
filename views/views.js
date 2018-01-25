const html = require('choo/html')

module.exports = views

function views(state, emit) {
  return html`
    <div class="cf">
      <div class="fl w-100 w-50-ns bg-near-white">
        <h1>RoYo</h1>
        ${reply()}
      </div>
      <div class="fl w-100 w-50-ns bg-light-gray">
        <h1>Column Two</h1>
        ${showLatest()}
      </div>
    </div>
  `

  function reply() {
    return html`
      <div>
        <textarea id="post_input" "placeholder="Reply..."></textarea><br>
        <p>${state.count}</p>
        <button onclick=${onClick}>Submit</button>
      </div>
    `
  }

  function onClick() {
    const post = document.getElementById('post_input').value
    emit('add:post', post)
    emit('increment', 1)
  }

  function showLatest() {
    return html`
      <div>
        <p>${state.latest}</p>
      </div>
    `
  }
}


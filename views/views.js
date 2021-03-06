const html = require('choo/html')

module.exports = views

function views(state, emit) {
  return html`
    <div class="cf bg-near-white">
      <div class="pa2 fl w-100 w-50-ns">
        <h1 class="ma2">Post</h1>
        ${reply()}
      </div>
      <div class="pa2 fl w-100 w-50-ns">
        <h1 class="ma2">Recent Posts</h1>
        ${showLatest()}
      </div>
    </div>
  `

  function reply() {
    return html`
      <div>
        <input class="mh2 mb2" id="msg_title"placeholder="Subject">
        <textarea class="mh2 w-two-thirds h4" id="msg_input" "placeholder="Message..."></textarea><br>
        <button class="pv2 ph4 ma2" onclick=${onClick}>Submit</button>
      </div>
    `
  }

  function onClick() {
    const title = document.getElementById('msg_title').value
    const post = document.getElementById('msg_input').value
    emit('add:post', { title, post })
  }

  function showLatest() {
    return html`
      <div>
        ${checkLatest()}
      </div>
    `
  }

  function checkLatest() {
    if(state.latest === 'No post yet') {
      return html`
        <div>
          <p>${state.latest}</p>
        </div>
      `
    } else {
      return html`
        <div>
          <p><strong>Subject</strong> ${state.latest.value.message.title}</p>
          <p><strong>Message</strong></p>
          <p>${state.latest.value.message.post}</p>
          <p>${state.latest.value.message.timestamp}</p>
          <p><strong>Key</strong></p>
          <p id="key">${state.latest.key}</p>
          <input type="hidden" id="link" value=${state.latest.links[0]}>
          <div class="ma2">
            <button class="mr2 pv2 ph4" onclick=${getPrev}>Prev</button>
            <button class="pv2 ph4" onclick=${getNext}>Next</button>
          </div>
        </div>
      `
    }
  }

  function getPrev() {
    const previous = document.getElementById('link').value
    emit('get:prev', previous)
  }

  function getNext() {
    //pulling from HTML rather than state so when...
    //more than one element present, state isn't needed
    const next = document.getElementById('key').innerHTML
    emit('get:next', next)
  }
}


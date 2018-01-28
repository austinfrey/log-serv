const html = require('choo/html')

module.exports = display

function display (state, emit) {
  return html`
    <div>
      <h1 class="ma2">Recent Posts</h1>
      <div id="posts">
        ${state.posts.map(post => {
          return html`
            <div class="pv4 ph3">
              <p>${post.value.content}</p>
              <p>${post.value.topic}</p>
            </div>
          `
        })}
      </div>
    </div>
  `
}

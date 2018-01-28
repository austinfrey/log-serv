const html = require('choo/html')

module.exports = display

function display (state, emit) {
  return html`
    <div>
      <h1 class="ma2">Recent Posts</h1>
      <div id="posts">
        ${state.posts.map(post => {
          return html`
            <p>${post}</p>
          `
        })}
      </div>
    </div>
  `
}

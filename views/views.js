const html = require('choo/html')

module.exports = views

function views(state, emit) {
  return html`
    <div>
      <input placeholder="Enter URL to Chop"><br>
      <button>Submit</button>
      <button>Copy</button>
    </div>
  `

  function showHeads() {
    const nodes = state.heads.map(head => {
      return html`
        <p>${JSON.stringify(head)}</p>
      `
    })

    return html`
      <div>
        ${nodes}
      </div>
    `
  }
}

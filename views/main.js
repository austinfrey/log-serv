const html = require('choo/html')
const post = require('./post')
const display = require('./display')

module.exports = mainView

function mainView(state, emit) {
  return html`
    <div class="cf">
      <div class="pa2 fl w-100 w-40-ns bg-washed-blue">
        ${post(state, emit)}
      </div>
      <div class="pa2 fl w-100 w-60-ns bg-washed-red tc">
        ${display(state, emit)}
      </div>
    </div>
  `
}


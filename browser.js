const choo = require('choo');
const html = require('choo/html');
const css = require('sheetify')
const states = require('./stores/state.js')
const views = require('./views/views.js')

const app = choo()

css('tachyons')
app.use(states)
app.route('/', mainView)
app.mount('body')

function mainView(state, emit) {
  return html`
    <body>
      ${views(state, emit)}
    </body>
  `
}


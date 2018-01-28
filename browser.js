const choo = require('choo');
const html = require('choo/html');
const css = require('sheetify')
const states = require('./stores/state.js')
const view = require('./views/main.js')

const app = choo()

css('tachyons')
css('./public/style.css')

app.use(states)
app.route('/', mainView)
app.mount('body')

function mainView(state, emit) {
  return html`
    <body>
      ${view(state, emit)}
    </body>
  `
}


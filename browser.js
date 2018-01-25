const choo = require('choo');
const html = require('choo/html');
const states = require('./stores/state.js')
const views = require('./views/views.js')

const app = choo()
app.use(states)
app.route('/', mainView)
app.mount('body')

function mainView(state, emit) {
  return html`
    <body>
      <div>
        <h1>RoYo</h1>
        ${views()}
      </div>
    </body>
  `
}


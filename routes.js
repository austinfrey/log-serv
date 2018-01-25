const router = require('routes')()
const ecstatic = require('ecstatic')({
  root: __dirname + '/public',
  handleErrors: false
})

module.exports = routes

router.addRoute('GET /data', (req, res, match) => {
  res.end(JSON.stringify(match))
})

function routes(req, res) {
  const m = router.match(req.method + ' ' + req.url)
  m ?  m.fn(req,res,m) : ecstatic(req,res)
}

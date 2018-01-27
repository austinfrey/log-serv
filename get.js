(async function() {
  const level = require('level')
  const db = level('.test', {valueEncoding: 'json'})
  try {
    const test = await db.get('test')
    test.push('ayo')
    await db.put('test', 'test')
    console.log(await db.get('test'))
  } catch(err) {
    await db.put('test', ['aya'])
    console.error(err)
  }
})()


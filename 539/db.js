const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
// const adapter = new FileSync('db.json')
const file = path.join(__dirname, 'db.json')
const adapter = new FileSync(file, {
  serialize: (obj) => JSON.stringify(obj),
  // deserialize: (data) => JSON.parse(data)
})
const db = low(adapter)
db.defaults({ dailycash: []})
  .write()


module.exports = db
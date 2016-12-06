const db = require('./db')
const Task = {

    add: ( req, res, next ) => {
      const {text} = req.body
      db.one(`INSERT INTO tasks (text) VALUES ('${text}') returning id`)
      .then(id => res.status(200).json({ status : 'success', data : id, message : 'SUCCESSFUL ADD'}))
    }
}

module.exports = Task;

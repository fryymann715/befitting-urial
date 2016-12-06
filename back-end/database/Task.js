const db = require('./db')

const Task = {

    add: ( req, res, next ) => {

      const {text} = req.body
      console.log(text)
      db.one(`INSERT INTO tasks (text) VALUES ('${text}') returning id`)
      .then(id => res.status(200).json({ status : 'success', data : id, message : 'SUCCESSFUL ADD'}))
    },
    getAll: (req, res, next) => {
      db.many(`SELECT * FROM tasks`)
      .then(tasks => res.status(200).json({status : 'success', data : tasks, message : 'SUCCESSFUL RETRIEVAL'}))
    },
    /*
    delete: (req, res, next) => {
      db.any(``)
      .then()
    }
    update: (req, res, next) => {
      db.any(`INSERT INTO tasks (req, res) VALUES ($1, $2) RETURNING *`)
      .then(id => res.status(200).json({status : 'success', data : tasks, message : 'SUCCESSFUL CREATION'}))
    }
    //delete
    //mark as completed or get individual item
    */
}

module.exports = Task;

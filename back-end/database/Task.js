const db = require('./db')

const Task = {

    add: ( request, response, next ) => {
      const { text } = request.body
      db.none( `INSERT INTO tasks (text) VALUES ('${text}')` )
      .then( response.status(200).json({ status : 'success', message : 'SUCCESSFUL ADD' })
      .catch( error => next( error ))
      )
    },

    getAll: ( request, response, next ) => {
      db.many( `SELECT * FROM tasks` )
      .then(tasks => response.status(200).json({status : 'success', data : tasks, message : 'SUCCESSFUL RETRIEVAL'}))
      .catch( error => next( error ))
    },

    getById: ( request, response, next ) => {
      const { id } = request.params
      db.one( `SELECT * FROM tasks WHERE id = ${id}` )
      .then(task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFUL RETRIEVAL'}))
      .catch( error => next(error))
    },

    update: ( request, response, next ) => {
      const { text, id } = request.body
      db.one( `UPDATE tasks SET text= '${text}' WHERE id = ${id} RETURNING *` ).then( task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFUL UPDATE'}))
    },

    delete: ( request, response, next ) => {
      const { id } = request.params
      db.none( `DELETE FROM tasks WHERE id = ${id}` ).then( response.status(200).json({status: 'success', message: 'SUCCESSFULLY DELETED'}) ).catch( error => next( error ))
    }
}

module.exports = Task;

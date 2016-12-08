const db = require('./db')

const Task = {

    add: ( request, response, next ) => {
      const { text } = request.body
      db.any( `INSERT INTO tasks (text) VALUES ('${text}') RETURNING *` )
      .then( task => {
        response.status(200).json({ status: 'success', data: task[0], message: 'SUCCESSFUL ADD' })} )
      .catch( error => next( error ))
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
      const { id, text, completed } = request.body
      console.log(completed)

      if ( completed ) {
        db.one(`UPDATE tasks SET completed=True WHERE id = ${id} RETURNING *`)
        .then( task => response.status( 200 ).json({ status: 'success', data: task, message: 'SUCCESSFULL UPDATE OF COMPLETION' }) )
        .catch( error => next( error ) )
      }
      else if ( text !== undefined && text !== '' ) {
        db.one( `UPDATE tasks SET text= '${text}' WHERE id = ${id} RETURNING *` )
        .then( task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFULLY UPDATED TASK TEXT'}))
        .catch( error => next( error ))
      } else {
        response.status(406).json({ status: 'failure', message: 'You suck' })
      }
    },

    delete: ( request, response, next ) => {
      const { id } = request.params
      db.none( `DELETE FROM tasks WHERE id = ${id}` ).then( response.status(200).json({status: 'success', message: 'SUCCESSFULLY DELETED'}) ).catch( error => next( error ))
    }
}

module.exports = Task;

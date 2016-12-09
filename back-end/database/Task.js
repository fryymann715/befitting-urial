const db = require('./db')

const Task = {

    add: ( request, response, next ) => {
      const { text, priority } = request.body

      if( text === undefined || text === '' ) {
        response.status(303).json({ status: 'failure', message: 'Task text can not be a blank string.' })
      } else {
        db.any( `INSERT INTO tasks (text, priority) VALUES ('${text}', '${priority}') RETURNING *` )
        .then( task => {
          //NOTE: this may be an issue.
          db.none( `INSERT INTO task_lists (task_id, list_id) VALUES (${task[0].id}, 1)` )
          response.status(200).json({ status: 'success', data: task[0], message: 'SUCCESSFUL ADD' })} )
        .catch( error => next( error ))
        }
    },

    getAll: ( request, response, next ) => {
      db.query(`
        SELECT tasks.* FROM tasks
        JOIN task_lists ON tasks.id = task_lists.task_id
        JOIN lists ON task_lists.list_id = lists.id
        WHERE lists.id = 1;
        `)
      .then( tasks => response.status(200).json({status : 'success', data : tasks, message : 'SUCCESSFUL RETRIEVAL'}))
      .catch( error => next( error ))
    },

    getById: ( request, response, next ) => {
      const { id } = request.params
      db.one( `SELECT * FROM tasks WHERE id = ${id}` )
      .then(task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFUL RETRIEVAL'}))
      .catch( error => next(error))
    },

    update: ( request, response, next ) => {
      const { id, text, completed, priority } = request.body

      if ( priority ) {
        db.one(`UPDATE tasks SET priority=${priority} WHERE id = ${id} RETURNING *`)
        .then( task => response.status( 200 ).json({ status: 'success', data: task, message: 'SUCCESSFULL UPDATE OF COMPLETION' }) )
        .catch( error => next( error ) )
      }
      else if ( text !== undefined && text !== '' ) {
        db.one( `UPDATE tasks SET text= '${text}' WHERE id = ${id} RETURNING *` )
        .then( task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFULLY UPDATED TASK TEXT'}))
        .catch( error => next( error ))
      }
      else if ( completed !== undefined ) {
        console.log( "COMPLETED: ", completed)
        db.one(`UPDATE tasks SET completed=${completed} WHERE id = ${id} RETURNING *`)
        .then( task => response.status( 200 ).json({ status: 'success', data: task, message: 'SUCCESSFULL UPDATE OF COMPLETION' }) )
        .catch( error => next( error ) )
      }
      else {
        response.status(406).json({ status: 'failure', message: 'You suck' })
      }
    },

    delete: ( request, response, next ) => {
      const { id } = request.params
      db.none( `
        BEGIN TRANSACTION;
        DELETE FROM task_lists WHERE task_id = ${id};
        DELETE FROM tasks WHERE id = ${id};
        COMMIT;
        ` )
      .then( response.status( 200 ).json({ status: 'success', message: 'SUCCESSFULLY DELETED' }) )
      .catch( error => next( error ))
    }
}

module.exports = Task;

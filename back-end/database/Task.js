const db = require('./db')

const Task = {

    add: ( request, response, next ) => {
      const { text } = request.body
      db.one( `INSERT INTO tasks (text) VALUES ('${text}') returning id` ).then( id => {
        response.status(200).json({ status : 'success', data : id, message : 'SUCCESSFUL ADD' })
      })
    },
    getAll: ( request, response, next ) => {
      db.many( `SELECT * FROM tasks` ).then(tasks => {
        response.status(200).json({status : 'success', data : tasks, message : 'SUCCESSFUL RETRIEVAL'})
      })
    },
    update: ( request, response, next ) => {
      const { text, id } = request.body
      db.one( `UPDATE tasks SET text= '${text}' WHERE id = ${id} RETURNING *` ).then( task => response.status(200).json({status : 'success', data : task, message : 'SUCCESSFUL UPDATE'}))
    }
    //delete
    //mark as completed or get individual item
    /**/
}

module.exports = Task;

const fs        =   require('fs'),
    sqltest     =   require('./sqltest'),
    Log      =   require('./Log'),
    sqlTxt      =   fs.readFileSync(process.env.SQL_FILE_PATH).toString(),
    query       =   { text: sqlTxt },
    _           =   require('lodash')


Log.setupMtLogger()



/*=====================================
=            KNEX Approach            =
=====================================*/

/*const knex = require('knex')({
  client: 'mssql',
  connection: {
    host : process.env.SQL_HOST,
    user: process.env.SQL_USR,
    password: process.env.SQL_PW,
    database : process.env.SQL_DB
  },
  pool: { min: 0, max: 7 }
});


knex.raw(sqlTxt).then((d)=>{
  console.log('here', d.length)
}).catch(e => {
  console.log('err', e)
})
*/


/*==========================================
=            Sequelize Approach            =
==========================================*/

sqltest.init()
  .then(() => {
    Log.log('silly', 'Initialized Service - Job Jackets')
    sqltest.search(query)
      .catch(err => {
        Log.error('threw search error', err)
      })
  }).catch((error) => {
    Log.error('Initialization Error - Service - Job Jackets\n', error)
  })



/*======================================
=            MSSQL Approach            =
======================================*/

/*const sql = require('mssql')

sql.connect({
    user: process.env.SQL_USR,
    password: process.env.SQL_PW,
    server: process.env.SQL_HOST, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.SQL_DB
}).then(pool => {
    // Query

    return pool.request()
      .query(query.text)
}).then(result => {
    console.dir(result)

}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
    console.error('err', err)
})

sql.on('error', err => {
    // ... error handler
    console.error('err', err)
})*/



/*========================================
=            ExecSQL Approach            =
========================================*/

/*var execsql = require('execsql'),
    dbConfig = {
      host: process.env.SQL_HOST,
      user: process.env.SQL_USR,
      password: process.env.SQL_PW
    },
    sql = `use employeefile;`,
    sqlFile = __dirname + '/sample.sql';
execsql.config(dbConfig)
    .exec(sql)
    .execFile(sqlFile, function(err, results){
        console.log(err)
        console.log(results);
    }).end();
*/

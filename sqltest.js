/*========================================
=            Required Modules            =
========================================*/
require('dotenv').config()
const Log         =   require('./Log'),
    Promise       =   require('bluebird'),
    Sequelize     =   require('sequelize')


// Private Vars
const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USR, process.env.SQL_PW, {
  host: process.env.SQL_HOST,
  dialect: process.env.SQL_DIALECT,
  pool: {
    max: process.env.SQL_POOL_MAX,
    min: process.env.SQL_POOL_MIN,
    idle: process.env.SQL_POOL_IDLE
  },
  logging: (process.env.LOG_SQL_STATEMENTS === 'true') ? Log.debug : false
})



/*=================================================
=            JobJackets Lookup Service            =
=================================================*/
const JobJacketsService = {
  init : () => {
    const connP = new Promise((resolve, reject) => {
      Log.info(`Connect to ${process.env.SQL_DIALECT} database at : `, {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USR,
        db: process.env.SQL_DB,
        dialect: process.env.SQL_DIALECT
      })

      let response = {}
      sequelize.authenticate()
        .then(() => {
          response = {
            msg: 'Sequelize connection success'
          }
          Log.log('silly', response.msg)
          resolve(response)
        })
        .catch(err => {
          response = {
            errorMsg: err,
            msg: 'Sequelize connection failure'
          }
          Log.error(response.msg, err)
          reject(response)
        })
    })
    return connP
  },
  search : (queryObj) => {
    // Query promise
    const searchP = new Promise((resolve, reject) => {
      let search_results,
          response

      sequelize.query(queryObj.text, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          Log.info(`Found : ${result.length} Records in SQL`)
          if (result.length) {
            search_results = result
            search_results.none = false
            //Log.info('Found Employee (s): ', search_results)
          } else {
            Log.info('No document(s) found with defined "find" criteria in AQL!')
            search_results = {none : true}
          }
          resolve(search_results)
        }).catch(err => {
          response = {
            errorMsg: err,
            msg: 'Query failure'
          }
          Log.error(response.msg, err)
          reject(response)
        })
    })
    return searchP
  }
}

// Export Singletons Service
module.exports = JobJacketsService

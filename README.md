# Sequelize Test Harness

Basic test harness for running SQL statements with Sequelize

## Setup

### 1. Setup an .env file
```yaml
SQL_FILE_PATH=./query.sql
SQL_DB=nameofdb
SQL_USR=svc_username
SQL_PW=1.$up3r.$3cur3.P@$$
SQL_HOST=localhost
SQL_PORT=1443
SQL_DIALECT=mssql
SQL_POOL_MAX=5
SQL_POOL_MIN=0
SQL_POOL_IDLE=10000
LOG_SQL_STATEMENTS=true

LOG_TO_CONSOLE=true
LOG_PRIORITY_CONSOLE=5

LOG_TO_FILE=false
LOG_PRIORITY_FILE=3
```

### 2. Create a valid SQL file and update relative path in .env
```yaml
SQL_FILE_PATH=./sample.query.sql
```

### 3. Run and watch for changes with PM2
`pm2 start ecosystem.config.js`

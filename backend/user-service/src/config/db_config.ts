import { Client } from 'pg'
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from './config'
import { Liquibase, LiquibaseConfig, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase'

const pgClient = new Client({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT
})


const liquibaseConfig: LiquibaseConfig = {
    ...POSTGRESQL_DEFAULT_CONFIG,
    url: `jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}`
}

const instance = new Liquibase(liquibaseConfig);


export default pgClient
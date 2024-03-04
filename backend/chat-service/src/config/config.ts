const PORT = process.env.PORT || 9202
const ENV = process.env.ENV || "development"

const CASSANDRA_USER = process.env.CASSANDRA_USER || 'cassandra'
const CASSANDRA_PASSWORD = process.env.CASSANDRA_PASSWORD || 'cassandra'
const CASSANDRA_CONTACT_POINTS = process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1:9042'

export {
    PORT, ENV, CASSANDRA_USER, CASSANDRA_PASSWORD, CASSANDRA_CONTACT_POINTS
}
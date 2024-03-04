
const PORT = process.env.PORT || 9200
const ENV = process.env.ENV || "development"

const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost"
const POSTGRES_PORT = process.env?.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432
const POSTGRES_DB = process.env.POSTGRES_DB || "chat_app"
const POSTGRES_USER = process.env.POSTGRES_USER || "chat_app"
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "chat@1234"

export {
    PORT,
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD
}

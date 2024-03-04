import { QueryResult, QueryResultRow } from "pg"
import pgClient from "../config/db_config"
import { User } from "../models"
import { logger } from "../config/logger"

const createUser = (user: User) => {

}

const getUserById = async (userId: string) => {
    logger.info(`getUserById userName:${userId}`)
    const queryResult = await pgClient.query('SELECT * FROM chat_user cu WHERE cu.user_id = $1 ', [userId]);
    logger.info(`getUserById queryResult: ${queryResult.rowCount}`)
    return mapQueryResultToUser(queryResult)
}

const getUserByUserName = async (userName: string) => {
    logger.info(`getUserByUserName userName:${userName}`)
    const queryResult = await pgClient.query('SELECT * FROM chat_user cu WHERE cu.user_name = $1 ', [userName]);
    logger.info(`getUserByUserName queryResult: ${queryResult.rowCount}`)
    return mapQueryResultToUser(queryResult)
}

const getAllUsers = async () => {
    logger.info(`getAllUsers`)
    const queryResult = await pgClient.query('SELECT * FROM chat_user');
    logger.info(`getAllUsers queryResult: ${queryResult.rowCount}`)
    return queryResult.rows
}

const checkIfUserExists = async (id: string) => {
    return true
}

const mapQueryResultToUser = (queryResult: QueryResult<any>) => {
    if (!queryResult.rowCount) {
        return {}
    }
    return convertQueryResultToUser(queryResult.rows[0])
}

const convertQueryResultToUser = (row: QueryResultRow) => {
    const user = new User(row['user_id']);
    user.userName = row['user_name'];
    user.firstName = row['first_name'];
    user.lastName = row['last_name'];
    user.email = row['email'];
    return user
}

export {
    getUserByUserName,
    getUserById,
    checkIfUserExists,
    mapQueryResultToUser,
    convertQueryResultToUser,

    getAllUsers
}


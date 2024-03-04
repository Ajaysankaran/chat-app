import { User } from "../models";
import { userRepo } from "../repos";

const getUserByUserName = async (userName: string) => {
    return await userRepo.getUserByUserName(userName);
}

const getUserById = async (id: string) => {
    return await userRepo.getUserById(id)
}

const getAllUsers = async () => {
    const users = await userRepo.getAllUsers();
    return users?.map(user => userRepo.convertQueryResultToUser(user)) || [];
}

const createUser = (user: User) => {

}

const checkIfUserExists = async (id: string) => {
    return await userRepo.checkIfUserExists(id);
}

export {
    getUserById,
    getUserByUserName,
    getAllUsers,
    createUser,
    checkIfUserExists
};


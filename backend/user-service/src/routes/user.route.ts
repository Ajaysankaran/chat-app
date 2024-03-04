import express, { Router } from 'express'
import { userService } from '../services';

const userRouter: Router = express.Router()

userRouter.get('/user', async (req, res) => {
    const id = req.query.userId;
    const userName = req.query.userName as string
    if (id) {
        const user = await userService.getUserById(id as string);
        return res.status(200).json(user);
    } else if (userName) {
        const user = await userService.getUserByUserName(userName);
        return res.status(200).json(user);
    } else {
        return res.status(400).send("Bad Request, send either id or userName as queryParams")
    }
})


userRouter.get('/users', async (req, res) => {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
})


export default userRouter;

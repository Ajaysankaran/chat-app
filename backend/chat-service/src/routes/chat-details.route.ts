import express, { Router } from 'express';
import { logger } from '../config/logger';
import authMiddleware from '../middleware/authmiddleware';
import { chatDetailService } from '../services';

const chatDetailsRouter: Router = express.Router();


chatDetailsRouter.get('/chat', authMiddleware, async (req, res) => {
    const userFromId = req.query.userFromId as string
    const userToId = req.query.userToId as string
    // Change Later
    logger.info(`chatDetailsRouter userFromId: ${userFromId} | userToId: ${userToId}`)

    if (userToId) {
        const chats = await chatDetailService.getMessagesBySenderAndReceiver(userFromId, userToId);
        return res.status(200).json(chats);
    } else {
        return res.status(400).send("Bad Request, send conversationId as queryParams")
    }
})

chatDetailsRouter.get('/chat/conversation-id', authMiddleware, async (req, res) => {
    const userFromId = req.headers['user-id'] as string
    const userToId = req.query.userToId as string
    const conversationId = await chatDetailService.getOrCreateConversationIdByUsers(userFromId, userToId);
    return res.status(200).json({ conversationId });
})

export default chatDetailsRouter
import {Request, Response} from "express";
import { MessageService } from "../services/MessageService";

class MessagesController {
    async create(req: Request,res: Response){
        const {admin_id, text, user_id} = req.body;

        const messageService = new MessageService();
        
        const message = await messageService.create({
            admin_id,
            text,
            user_id,
        });

        return res.json(message);
    }

    //localhost:3333/messages/idDoUser
    async showByUser(req: Request,res: Response){
        const { id } = req.params;

        const messageService = new MessageService();

        const list = await messageService.listByUser(id);

        return res.json(list);
    }
}

export {MessagesController};
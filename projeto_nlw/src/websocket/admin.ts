import {io} from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {MessageService} from "../services/MessageService";


io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messageService = new MessageService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    socket.on("admin_list_message_by_user",async (params, cb) => {
        const {user_id} = params;
        const allMessages = await messageService.listByUser(user_id); 

        cb(allMessages);
    }); 
});

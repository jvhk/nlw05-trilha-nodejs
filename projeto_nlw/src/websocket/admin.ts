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

    socket.on("admin_send_message", async (params) => {
        const  {user_id, text} = params;

        await messageService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const {socket_id} = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket_id,
        });
    });
});

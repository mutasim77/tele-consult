import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIO } from '@/types/next';

export const config = {
    api: {
        bodyParser: false,
    }
}

const users: { [id: string]: { language: string, operatorId: string | null } } = {};
const operators: string[] = [];
const queue: string[] = [];

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path,
            addTrailingSlash: false
        });

        io.on('connection', (socket) => {
            socket.on('register', ({ role, language }) => {
                if (role === 'user') {
                    users[socket.id] = { language, operatorId: null };
                    queue.push(socket.id);
                    io.to('operators').emit('queueUpdate', queue);
                } else if (role === 'operator') {
                    operators.push(socket.id);
                    socket.join('operators');
                    socket.emit('queueUpdate', queue);
                }
            });

            socket.on('acceptUser', (userId) => {
                if (operators.includes(socket.id) && queue.includes(userId)) {
                    const userIndex = queue.indexOf(userId);
                    queue.splice(userIndex, 1);
                    users[userId].operatorId = socket.id;
                    io.to(userId).emit('operatorJoined', socket.id);
                    io.to('operators').emit('queueUpdate', queue);
                }
            });

            socket.on('message', ({ to, message }) => {
                io.to(to).emit('message', { from: socket.id, message });
            });

            socket.on('disconnect', () => {
                if (users[socket.id]) {
                    const index = queue.indexOf(socket.id);
                    if (index > -1) {
                        queue.splice(index, 1);
                    }
                    delete users[socket.id];
                    io.to('operators').emit('queueUpdate', queue);
                } else if (operators.includes(socket.id)) {
                    const index = operators.indexOf(socket.id);
                    operators.splice(index, 1);
                }
            });
        })

        res.socket.server.io = io;
    }

    res.end();
}

export default ioHandler;

const updateQueues = (io: ServerIO) => {
    const queues = {
        Tajik: ['User1', 'User2'],
        Russian: ['User3'],
        English: ['User4', 'User5', 'User6'],
    };
    io.emit('queueUpdate', queues);
};

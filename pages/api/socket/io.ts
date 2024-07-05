import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIO } from '@/types/next';

export const config = {
    api: {
        bodyParser: false,
    }
}

const usersByLanguage: { [language: string]: string[] } = {};
const operators: string[] = [];

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
                    if (!usersByLanguage[language]) {
                        usersByLanguage[language] = [];
                    }
                    usersByLanguage[language].push(socket.id);
                    io.to('operators').emit('queueUpdate', usersByLanguage);
                } else if (role === 'operator') {
                    operators.push(socket.id);
                    socket.join('operators');
                    socket.emit('queueUpdate', usersByLanguage);
                }
            });

            socket.on('acceptUser', ({ userId, language }) => {
                if (operators.includes(socket.id) && usersByLanguage[language]?.includes(userId)) {
                    const userIndex = usersByLanguage[language].indexOf(userId);
                    usersByLanguage[language].splice(userIndex, 1);
                    io.to(userId).emit('operatorJoined', socket.id);
                    io.to('operators').emit('queueUpdate', usersByLanguage);
                }
            });

            socket.on('message', ({ to, message }) => {
                io.to(to).emit('message', { from: socket.id, message });
            });

            socket.on('disconnect', () => {
                for (const language in usersByLanguage) {
                    const index = usersByLanguage[language].indexOf(socket.id);
                    if (index > -1) {
                        usersByLanguage[language].splice(index, 1);
                        io.to('operators').emit('queueUpdate', usersByLanguage);
                        return;
                    }
                }
                if (operators.includes(socket.id)) {
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
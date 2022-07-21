"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLiveEventsRouter = void 0;
const serializeMessage = (message) => {
    return `data: ${JSON.stringify(message)}\n\n`;
};
const makeLiveEventsRouter = () => {
    let clients = [];
    const router = (request, response) => {
        const headers = {
            'content-type': 'text/event-stream',
            connection: 'keep-alive',
            'cache-control': 'no-cache',
        };
        response.writeHead(200, headers);
        response.write(serializeMessage({ type: 'init' }));
        const clientId = String(Math.random());
        const newClient = {
            id: clientId,
            response,
        };
        clients.push(newClient);
        request.on('close', () => {
            clients = clients.filter((client) => client.id !== clientId);
        });
    };
    const sendEventToClient = (event) => {
        clients.forEach((client) => {
            client.response.write(serializeMessage(event));
        });
    };
    return {
        sendEventToClient,
        router,
    };
};
exports.makeLiveEventsRouter = makeLiveEventsRouter;

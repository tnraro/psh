import Aedes from "aedes";
import net from "net";
import http from "http";
import ws from "websocket-stream";
const port = 1883;
const wsPort = 8888;

const aedes = Aedes();
aedes.on("clientError", (client) => {
    console.error("clientError", client.id);
});

aedes.on("connectionError", (client) => {
    console.error("connectionError", client.id);
});

aedes.on("clientReady", (client) => {
    console.log("clientReady", client.id);
});

aedes.on("clientDisconnect", (client) => {
    console.log("clientDisconnect", client.id);
});

const server = net.createServer(aedes.handle);

server.listen(port, () => {
    console.log(`🚀 Server ready at :${port}`);
});

const httpServer = http.createServer();

ws.createServer({ server: httpServer }, aedes.handle as any);

httpServer.listen(wsPort, () => {
    console.log(`🚀 Server ready at :${wsPort}`);
});

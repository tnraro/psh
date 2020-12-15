import Aedes from "aedes";
import net from "net";
import http from "http";
import ws from "websocket-stream";
const { MQTT_NET, MQTT_WS } = process.env;

if (!(MQTT_NET && MQTT_WS)) {
    throw new Error("No env");
}

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

server.listen(MQTT_NET, () => {
    console.log(`🚀 Server ready at :${MQTT_NET}`);
});

const httpServer = http.createServer();

ws.createServer({ server: httpServer }, aedes.handle as any);

httpServer.listen(MQTT_WS, () => {
    console.log(`🚀 Server ready at :${MQTT_WS}`);
});

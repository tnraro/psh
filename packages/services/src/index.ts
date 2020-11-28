import { connect, MqttClient } from "mqtt";
import fs from "fs";
import { resolve } from "path";
import fetch from "node-fetch";
interface IConfig {
    endpoint: string;
    graphql: string;
}
function loadConfig(): IConfig {
    const path = resolve(__dirname, "../.env/config.json");
    const data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}
const config = loadConfig();
interface Client {
    mqtt: MqttClient;
}
const client: Client = {
    mqtt: connect(config.endpoint)
};
interface ITopic {
    topic: string;
    test: RegExp;
    resolver: (client: Client, payload: Buffer, ...args: any[]) => void;
}
const PUSH_QUERY = `
mutation PushDeviceStatus($deviceId:ID!,$status:String) {
    status:pushDeviceStatus(device:$deviceId,status:$status)
}`;
const FETCH_QUERY = `
query FetchDeviceStatus($deviceId:ID!) {
    status:fetchDeviceStatus(device:$deviceId)
}`;
const topics: ITopic[] = [
    {
        topic: "+/+/push",
        test: /^([a-zA-Z0-9_-]{16})\/([a-zA-Z0-9_-]{16})\/push$/,
        resolver: async (client, payload, deviceId, sessionId) => {
            const result = await fetch(config.graphql, {
                method: "POST",
                headers: {
                    Authorization: sessionId,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    query: PUSH_QUERY,
                    variables: {
                        deviceId: deviceId,
                        status: payload.toString()
                    }
                })
            });
            console.log(await result.text());
        }
    },
    {
        topic: "+/fetch",
        test: /^([a-zA-Z0-9_-]{16})\/fetch$/,
        resolver: async (client, payload, deviceId) => {
            const result = await fetch(config.graphql, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    query: FETCH_QUERY,
                    variables: {
                        deviceId: deviceId
                    }
                })
            });
            const data = await result.text();
            client.mqtt.publish(`${deviceId}/push`, data);
        }
    }
];
client.mqtt.on("connect", () => {
    client.mqtt.subscribe(topics.map((t) => t.topic));

    client.mqtt.publish("lUd0IaqQZGnUvUYA/fetch", "");
});
client.mqtt.on("message", (topic, payload) => {
    for (const t of topics) {
        const m = t.test.exec(topic);
        if (m) {
            t.resolver.call(null, client, payload, ...m.slice(1, m.length));
            break;
        }
    }
});
client.mqtt.on("error", (err: any) => {
    console.error(err.code);
});

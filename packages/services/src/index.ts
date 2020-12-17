import mqtt, { MqttClient } from "mqtt";
import fs from "fs";
import { resolve } from "path";
import fetch from "node-fetch";
const { MQTT_NET, GRAPHQL } = process.env;
const config = {
    mqtt: `mqtt://localhost:${MQTT_NET}`,
    graphql: `http://localhost:${GRAPHQL}`
};
const client = mqtt.connect(config.mqtt);
client.on("connect", (packet) => {
    console.log(packet);
    client.subscribe(
        topics.map((t) => t.topic),
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("ready", config.mqtt);
        }
    );
});
client.on("message", (topic, payload) => {
    for (const t of topics) {
        const m = t.test.exec(topic);
        if (m) {
            t.resolver.call(null, client, payload, ...m.slice(1, m.length));
            break;
        }
    }
});
client.on("error", (err: any) => {
    console.error(err.code);
});
interface ITopic {
    topic: string;
    test: RegExp;
    resolver: (client: MqttClient, payload: Buffer, ...args: any[]) => void;
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
            try {
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
            } catch (e) {
                console.error(e);
            }
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
            const data = await result.json();
            const status = data.data.status;
            console.log(status);
            client.publish(`${deviceId}/push`, status);
        }
    }
];

const mqtt = require('mqtt')

const host = 'ws://broker.hivemq.com/mqtt'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const client = mqtt.connect(host, {
    clientId,
    port: 8000,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 5000,
})

const topic = 'skarduino/msg'

client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })

    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})
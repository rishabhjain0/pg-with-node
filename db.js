const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "NodeWithpg"
})

client.on('connect', () => {
    console.log("Database connection");
})


module.exports = client;
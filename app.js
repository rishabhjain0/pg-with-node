const client = require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
var cors = require("cors");
const http = require("http");


const app = express();

app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }))
app.use(bodyParser.json({ limit: "2mb" }))

app.use(cors());


app.get("/:tableName", async (req, res) => {
    let tbn = req.params.tableName;
    try {
        let sql = `
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS ${tbn}(id uuid primary key default gen_random_uuid()) `;
        client.query(sql, (err, result) => {
            if (err) {

                console.log(err);
            }
            console.log(result);
            http.get(`http://localhost:3001/app/gettables`, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {

                    // Concatinate each chunk of data

                    console.log("heloooooooooooooooooo", data);
                    res.json({
                        status: "success",
                        data: JSON.parse(data)
                    })
                })
            })

        })
    } catch (error) {
        console.log(error);
    }
    // res.json({ "data": "rishabh jain" })
})

app.get("/app/gettables", (req, res) => {
    console.log("assdfkdslf");
    let sql = `SELECT table_name
      FROM information_schema.tables
     WHERE table_schema='public'
       AND table_type='BASE TABLE';`;
    // let tableName = req.params.tableName;
    // const query = {
    //     text: `SELECT * from ${tableName}`,
    //     // rowMode: "array"
    // }
    try {
        client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: "failure"
                })
            }
            else {
                console.log(result);
                res.json({
                    status: "success",
                    data: result,
                })

            }
        })

    } catch (error) {
        console.log(error);
    }

})

app.get("/app/gettabledata/:tableName", (req, res) => {

    let tableName = req.params.tableName;
    const query = {
        text: `SELECT * from ${tableName}`,
        // rowMode: "array"
    }
    try {
        client.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: "failure"
                })
            }
            else {
                console.log(result);
                res.json({
                    status: "success",
                    data: result,
                })

            }
        })

    } catch (error) {
        console.log(error);
    }

})

app.get("/app/gettablecolumns/:tableName", (req, res) => {

    let tableName = req.params.tableName;
    console.log(tableName);
    const query = {
        text: `SELECT column_name
  FROM information_schema.columns
 WHERE table_schema = 'public'
   AND table_name   = '${tableName}'
     ;`,
        // rowMode: "array"
    }
    try {
        client.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: "failure"
                })
            }
            else {
                console.log(result);
                res.json({
                    status: "success",
                    data: result,
                })

            }
        })

    } catch (error) {
        console.log(error);
    }

})

app.post("/addcolumn", (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let sql = `ALTER TABLE ${data.tableName} 
                ADD COLUMN ${data.data.colName} ${data.data.dataType} ${data.data.required ? "NOT NULL" : ""} ${data.data.primarykey ? "Primary key" : ""}
        `;
        console.log(sql);
        client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            http.get(`http://localhost:3001/app/gettablecolumns/${data.tableName}`, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {

                    // Concatinate each chunk of data

                    console.log("heloooooooooooooooooo", data);
                    res.json({
                        status: "success",
                        data: JSON.parse(data)
                    })
                })
            })

            // res.json({
            //     data: result
            // })
        })

    } catch (error) {
        console.log(error);
    }
})

app.post("/app/insert", (req, res) => {
    let data = req.body;
    try {
        let attr = "";
        let values = Object.values(data.data);
        let value = ``;
        values.forEach((k) => {
            value = `${value}'${k}',`
        })
        console.log(value);
        value = value.slice(0, value.length - 1);
        let keys = Object.keys(data.data);
        console.log(keys);

        let sql = `Insert INTO ${data.tableName}(${keys.join(",")}) VALUES(${value})`;
        console.log(sql);
        client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            http.get(`http://localhost:3001/app/gettabledata/${data.tableName}`, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {

                    // Concatinate each chunk of data

                    console.log("heloooooooooooooooooo", data);
                    res.json({
                        status: "success",
                        data: JSON.parse(data)
                    })
                })
            })

            // res.json({
            //     data: result
            // })
        })


    } catch (error) {

    }

})

app.listen(3001, () => {
    console.log("server running on port 3001");
})


client.connect();


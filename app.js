const client = require("./db");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }))
app.use(bodyParser.json({ limit: "2mb" }))


app.get("/:tableName", async (req, res) => {
    let tbn = req.params.tableName;
    try {
        let sql = `CREATE TABLE ${tbn}(id serial primary key) `;
        client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.json({
                data: result
            })
        })
    } catch (error) {
        console.log(error);
    }
    // res.json({ "data": "rishabh jain" })
})

app.post("/addcolumn", (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let sql = `ALTER TABLE ${data.tableName} 
            ${data.data.map((d) => {
            return `ADD COLUMN ${d.colName} ${d.dataType} ${d.required ? "NOT NULL" : ""} ${d.primarykey ? "Primary key" : ""}`;
        }).join(",")}
        `;
        console.log(sql);
        client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.json({
                data: result
            })
        })

    } catch (error) {
        console.log(error);
    }
})

app.post("/update", (req, res) => {
    let data = req.body.data;
    try {
        let attr = "";
        let sql = `Insert INTO ${data.tableName} values(${data.data.join(",")})`;
        console.log(sql);


    } catch (error) {

    }

})

app.listen(3001, () => {
    console.log("server running on port 3001");
})


client.connect();


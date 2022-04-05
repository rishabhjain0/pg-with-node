import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function AddData() {
    const { tableName } = useParams();

    const [tableData, setTableData] = useState([]);
    const [inpData, setInpData] = useState({});
    useEffect(() => {
        console.log("gello");
        fetch(`http://localhost:3001/app/gettabledata/${tableName}`,)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success") {
                    setTableData(result.data.rows);
                    let data = {};
                    Object.entries(result.data.rows[0]).forEach((p) => {
                        if (p[0] !== "id")
                            data[p[0]] = "";
                    })
                    setInpData(data);
                    console.log("hltod");
                }
                console.log(tableData);
            })
            .catch((err) => console.log(err))
    }, []);

    function addDataInTable() {

        let data = {
            tableName: tableName,
            data: inpData
        }
        fetch(`http://localhost:3001/app/insert`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success") {
                    console.log(result.data.data);
                    setTableData(result.data.data.rows);
                }
            })
            .catch((err) => console.log(err))
    }
    function handleChange(e) {
        let data = inpData;
        console.log(e.target.value);
        data[e.target.name] = e.target.value;

        console.log(data);

        setInpData(data);
        // e.target.value = inpData[e.target.name]
    }

    function setValue() {
        console.log("hello");
    }

    return (
        <div>
            {
                tableData ? tableData.map((d) => {
                    return <div style={{ display: "flex" }}>
                        {
                            <div>
                                <div>
                                    {
                                        d ? Object.entries(d).map((p) => {
                                            return <div>
                                                <span>{p[0]} </span>
                                                <span>{p[1]} </span>
                                                <br />
                                            </div>

                                        }) : ""
                                    }
                                </div>

                            </div>



                        }
                    </div>
                }) : "hello"
            }
            {

                tableData[0] ? Object.entries(tableData[0]).map((p) => {
                    return <div>
                        {console.log(inpData)}
                        {p[0] !== "id" ? <input type="text" name={p[0]} value={inpData[p[1]]} onChange={handleChange} /> : <br />}
                    </div>
                }) : ""
            }
            <button onClick={addDataInTable}>Add Data</button>
        </div>
    )
}

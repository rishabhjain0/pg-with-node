import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function AddData() {
    const { tableName } = useParams();

    const [tableData, setTableData] = useState([]);
    const [inpData, setInpData] = useState({});
    useEffect(() => {
        console.log("gello");
        fetch(`http://localhost:3001/app/gettablecolumns/${tableName}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result.data);
                if (result.status === "success") {
                    let data = {};
                    result.data.rows.forEach((p) => {
                        console.log(p);
                        if (p.column_name !== "id")
                            data[`${p.column_name}`] = "";
                    })
                    setInpData(data);
                    console.log(inpData);
                }
            }).catch((err) => console.log(err))
        fetch(`http://localhost:3001/app/gettabledata/${tableName}`,)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success") {
                    setTableData(result.data.rows);

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

                inpData ? Object.entries(inpData).map((p) => {
                    return <div>
                        {console.log(inpData)}

                        {p[0] !== "id" ?
                            <div>
                                <label>{p[0]}</label>
                                <input type="text" name={p[0]} placeholder={p[0]} value={inpData[p[1]]} onChange={handleChange} />

                            </div>
                            : <br />}
                    </div>
                }) : ""
            }
            <button onClick={addDataInTable}>Add Data</button>
        </div>
    )
}

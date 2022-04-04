import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function AddColumn() {
    const { tableName } = useParams();
    const [columnNames, setColumnNames] = useState();
    const [inpData, setInpData] = useState({
        tableName: tableName,
        data: {
            colName: "",
            dataType: "",
            required: "",
            primarykey: "",
        }
    });

    useEffect(() => {
        console.log(tableName);
        fetch(`http://localhost:3001/app/gettablecolumns/${tableName}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result.data);
                if (result.status === "success")
                    setColumnNames(result.data.rows);
                console.log(columnNames);
            }).catch((err) => console.log(err))
    }, []);
    function handleChange(e) {
        console.log(e.target.type, e.target.name);
        let data = inpData;
        if (e.target.type === "checkbox") {
            data.data[e.target.name] = e.target.checked;
        }
        else
            data.data[e.target.name] = e.target.value;

        setInpData(data);

    }


    function handleSubmit() {
        console.log(inpData);
        let url = `http://localhost:3001/addcolumn`;
        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inpData)
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success") {
                    console.log(result.data.data);
                    setColumnNames(result.data.data.rows);
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            {
                columnNames ? columnNames.map((c) => {
                    return (
                        <div>
                            {c.column_name}

                        </div>
                    )
                }) : "hello"
            }
            <input type="text" value={inpData.colName} name="colName" onChange={handleChange} />
            <input type="text" value={inpData.dataType} name="dataType" onChange={handleChange} />
            <input type="checkbox" name="primarykey" id="primarykey" onChange={handleChange} />
            <input type="checkbox" name="required" id="required" onChange={handleChange} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

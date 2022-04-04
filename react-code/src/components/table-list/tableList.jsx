import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TableList = () => {
    const [tableNames, setTableNames] = useState([]);
    const [inpData, setInpData] = useState("");
    useEffect(() => {

        fetch("http://localhost:3001/app/gettables")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success")
                    setTableNames(result.data.rows);
                console.log(tableNames);
            })
            .catch((err) => console.log(err))
    }, []);

    function handleChange(e) {
        setInpData(e.target.value);
    }


    function handleSubmit() {
        console.log(inpData);
        let url = `http://localhost:3001/${inpData}`
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === "success") {
                    console.log(result.data.data);
                    setTableNames(result.data.data.rows);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>{tableNames ? tableNames.map((t) => {
            return (
                <p><Link to={`/addColumn/${t.table_name}`}>
                    {t.table_name}
                </Link></p>
            )
        }) : "hello"}
            <input type="text" value={inpData} onChange={handleChange} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default TableList;
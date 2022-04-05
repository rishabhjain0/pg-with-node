import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TableList = () => {
    const navigate = useNavigate();
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

    function addDataInTable(e) {
        console.log(e.target.getAttribute("data-val"));
        navigate(`/addData/${e.target.getAttribute("data-val")}`);

    }

    return (
        <div>{tableNames ? tableNames.map((t) => {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p><Link to={`/addColumn/${t.table_name}`}>
                        {t.table_name}
                    </Link></p>
                    <button data-val={t.table_name} onClick={addDataInTable} >Add Data</button>
                </div>

            )
        }) : "hello"}
            <input type="text" value={inpData} onChange={handleChange} />
            <button onClick={handleSubmit}>submit</button>
        </div >
    )
}

export default TableList;
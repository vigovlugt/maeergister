import { useState } from "react"

export default () => {
    const [sql,setSql] = useState("");
    const [result,setResult] = useState();

    const execSql = async ()=>{
        if(sql == "")return;
        const res = await fetch("/api/database",{
            body:JSON.stringify({sql}),
            method:"POST"
        });
        const text = await res.json();
        setResult(text);
    }

    return (
        <div>
            <textarea className="form-control" onChange={e=>setSql(e.target.value)}/>
            <button className="btn btn-primary" onClick={execSql}>Query</button>
            <p>
            {
                JSON.stringify(result,null,2)
            }
            </p>
            <p>SELECT DATA_TYPE,COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_name = 'Students'</p>
        </div>

    )
}
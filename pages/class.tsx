import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import fetch from "node-fetch";

interface IProps {
    classes:any[];
}

const ClassPage: NextPage<IProps> = ({classes}) => <div className="class-grid mt-3">
    {classes.map((c,i)=>(<div className="class-item">
        <h3>{c.Name}</h3>
    </div>))}
    <style jsx>{`.class-grid{
        display:flex;
    }
    .class-item{
        padding:15px;
        border-radius:5px;
        background-color:rgba(0,0,0,.05);
    }`}

    </style>
</div>;

ClassPage.getInitialProps = async ({req})=>{
    const baseUrl = req ? `https://${req.headers.host}` : '';
    console.log(baseUrl+"/api/class")
    const res = await fetch(baseUrl + "/api/class");
    const {data} = await res.json();
    return {classes:data}
}

export default ClassPage;

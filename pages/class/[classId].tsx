import { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import fetch from "node-fetch";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  class: any;
  students: any[];
}

const ClassPage: NextPage<IProps> = props => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  return (
    <div className="my-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/class">
              <a>Klassen</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.class.Name}
          </li>
        </ol>
      </nav>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Naam</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.Name}</td>
            </tr>
          ))}
          {!props.students.length && (
            <tr>
              <td>
                <b>De klas heeft nog geen leerlingen...</b>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

ClassPage.getInitialProps = async ctx => {
  const baseUrl = ctx.req ? `http://${ctx.req.headers.host}` : "";
  const res = await fetch(baseUrl + "/api/class/" + ctx.query.classId);
  const json = await res.json();
  return json.data;
};
export default ClassPage;

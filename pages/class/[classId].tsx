import { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import fetch from "node-fetch";
import Link from "next/link";
import { useState } from "react";
import StudentModal from "../../components/Modals/StudentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  class: any;
  students: any[];
}

const ClassPage: NextPage<IProps> = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const showCreateModal = () => {
    setShowModal(true);
    setSelectedStudent(-1);
  };

  const showStudentModal = (id: number) => {
    setShowModal(true);
    setSelectedStudent(id);
  };

  return (
    <div className="my-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-white d-flex justify-content-between">
          <div className="d-flex flex-row">
            <li className="breadcrumb-item">
              <Link href="/class">
                <a>Klassen</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.class.Name}
            </li>
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ height: "24px", padding: "0px 5px" }}
            onClick={showCreateModal}
          >
            <FontAwesomeIcon icon={faPlus} /> Student Toevoegen
          </button>
        </ol>
      </nav>

      <table className="table bg-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Naam</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((s, i) => (
            <tr
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => showStudentModal(s.Id)}
            >
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
      {showModal && (
        <StudentModal
          show={showModal}
          onHide={() => setShowModal(false)}
          studentId={selectedStudent}
        ></StudentModal>
      )}
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

import { NextPage } from "next";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import fetch from "node-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewAbsenceModal from "../components/Modals/NewAbsenceModal";
import { useState } from "react";

interface IProps {
  absences: any[];
}

const AbsencePage: NextPage<IProps> = ({ absences: absencesProp }) => {
  const [absences, setAbsences] = useState(absencesProp);
  const [showModal, setShowModal] = useState(false);

  const addAbsence = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-3">Absenten</h1>
        <Card style={{ height: "38px", padding: "0px" }}>
          <Card.Body style={{ padding: "5px" }}>
            <Badge variant="success">Afwezig met reden</Badge>
            <Badge variant="warning" className="mx-1">
              Ziek
            </Badge>
            <Badge variant="danger">Ongeoorloofd afwezig</Badge>
          </Card.Body>
        </Card>
      </div>

      <Table striped variant="light">
        <thead>
          <tr>
            <th>Naam leerling</th>
            <th>Datum</th>
            <th>Les</th>
            <th>Reden</th>
          </tr>
        </thead>
        <tbody>
          {absences.map(a => (
            <tr
              className={`bg-${
                { OG: "danger", ZIEK: "warning", GO: "succes" }[a.Type]
              } text-light`}
              key={a.Id}
            >
              <td>{a.StudentName}</td>
              <td>{a.Date.split("T")[0]}</td>
              <td>{a.Class}</td>
              <td>{a.Reason}</td>
            </tr>
          ))}
          <tr style={{ cursor: "pointer" }} onClick={addAbsence}>
            <td className="text-primary font-weight-bold">
              <FontAwesomeIcon icon={faPlus} /> Nieuwe absentie maken
            </td>
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </Table>
      <NewAbsenceModal
        setAbsences={setAbsences}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};
//[ { "DATA_TYPE": "int", "COLUMN_NAME": "Id" }, { "DATA_TYPE": "int", "COLUMN_NAME": "StudentId" }, { "DATA_TYPE": "datetime", "COLUMN_NAME": "Date" }, { "DATA_TYPE": "varchar", "COLUMN_NAME": "Class" } ]

AbsencePage.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const res = await fetch(baseUrl + "/api/absence");
  const { data } = await res.json();
  console.log(data);
  return { absences: data };
};

export default AbsencePage;

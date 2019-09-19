import { NextPage } from "next";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

interface IProps {
  absences: any[];
}

const AbsencePage: NextPage<IProps> = ({ absences }) => {
  absences = [{ Id: -1, Student: {}, Date: new Date(), Class: "NAT" }];

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
            <>
              <tr className="bg-success text-light" key={a.Id}>
                <td>Naam1</td>
                <td>Datum1</td>
                <td>Les1</td>
                <td>Reden1</td>
              </tr>
              <tr className="bg-success text-light">
                <td>Naam1</td>
                <td>Datum1</td>
                <td>Les1</td>
                <td>Reden1</td>
              </tr>

              <tr className="bg-danger text-light">
                <td>Naam1</td>
                <td>Datum1</td>
                <td>Les1</td>
                <td>Reden1</td>
              </tr>

              <tr className="bg-warning text-light">
                <td>Naam1</td>
                <td>Datum1</td>
                <td>Les1</td>
                <td>Reden1</td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
//[ { "DATA_TYPE": "int", "COLUMN_NAME": "Id" }, { "DATA_TYPE": "int", "COLUMN_NAME": "StudentId" }, { "DATA_TYPE": "datetime", "COLUMN_NAME": "Date" }, { "DATA_TYPE": "varchar", "COLUMN_NAME": "Class" } ]

AbsencePage.getInitialProps = async ctx => {
  return { absences: [] };
};

export default AbsencePage;

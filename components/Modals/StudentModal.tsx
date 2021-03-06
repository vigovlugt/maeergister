import { FC, useState, useEffect, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import IStudent, { DefaultStudent } from "../../models/Student";
import Button from "react-bootstrap/Button";
import { Jumbotron, FormGroup, Col } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/FormGroup";
import Label from "react-bootstrap/FormLabel";

interface IProps {
  show: boolean;
  onHide: () => any;
  studentId: number;
}

const StudentModal: FC<IProps> = ({ show, onHide, studentId }) => {
  const [student, setStudent] = useState<IStudent>(DefaultStudent);

  const createMode = studentId === -1;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [classTitle, setClass] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [grades, setGrades] = useState(["0", "0", "0", "0"]);

  useEffect(() => {
    if (studentId && studentId != -1) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    const res = await fetch("/api/student/" + studentId);
    const { data } = await res.json();
    setStudent(data);
    setName(data.Name);
    setDate(
      data.DateOfBirth.split("T")[0]
        .split("-")
        .reverse()
        .join("-")
    );
    setClass(data.Class.Name);
    setAdress(data.Adress);
    setCity(data.City);
    setGrades([data.Grade1, data.Grade2, data.Grade3, data.Grade4]);
    console.log(data);
  };

  const close = () => {
    onHide();
  };

  const save = async () => {
    console.log("Save");
    const classId = window.location.href.split("/").slice(-1)[0];
    const student = {
      Name: name,
      ClassId: parseInt(classId),
      DateOfBirth: date,
      Adress: adress,
      City: city,
      Id: studentId
    };
    grades.forEach((g, i) => (student["Grade" + (i + 1)] = parseFloat(g)));

    if (createMode) {
      const res = await fetch("/api/student/POST", {
        method: "POST",
        body: JSON.stringify(student)
      });
      close();
    } else {
      const res = await fetch("/api/student/" + studentId, {
        method: "PUT",
        body: JSON.stringify(student)
      });
      close();
    }
  };

  const deleteMe = async () => {
    const res = await fetch("/api/student/" + studentId, { method: "DELETE" });
    const json = await res.json();
    close();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>
          {createMode ? "Nieuwe student" : student.Name || "Laden..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Jumbotron className="d-flex justify-content-center align-items-center">
          <div
            className="bg-white d-flex justify-content-center align-items-center"
            style={{ borderRadius: "50%", height: "100px", width: "100px" }}
          >
            <FontAwesomeIcon icon={faUser} size={"4x"} />
          </div>
        </Jumbotron>
        <Form>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Naam</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Geboortedatum</label>
              </div>
              <div className="col-8">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Klas</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  value={classTitle}
                  onChange={e => setClass(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>
          <h4>Woonplaats</h4>
          <FormGroup>
            <div className="row">
              <div className="col-2 col-form-label">
                <label>Adres</label>
              </div>
              <div className="col-4">
                <input
                  className="form-control"
                  value={adress}
                  onChange={e => setAdress(e.target.value)}
                />
              </div>
              <div className="col-2 col-form-label">
                <label>Stad</label>
              </div>
              <div className="col-4">
                <input
                  className="form-control"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>
          <h4>Cijfers</h4>
          <FormGroup>
            <div className="row">
              {[1, 2, 3, 4].map(n => (
                <Fragment key={n}>
                  <div className="col-3 my-2 col-form-label">
                    <label>Periode {n}</label>
                  </div>
                  <div className="col-3 my-2">
                    <input
                      type="number"
                      className="form-control"
                      value={grades[n - 1]}
                      onChange={e => {
                        const newGrades = [...grades];
                        newGrades[n - 1] = e.target.value;
                        setGrades(newGrades);
                      }}
                      style={{ width: "80px" }}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={close}>
          Annuleren
        </Button>
        {!createMode && (
          <Button variant="danger" onClick={deleteMe}>
            Verwijderen
          </Button>
        )}

        <Button variant="primary" onClick={save}>
          Opslaan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;

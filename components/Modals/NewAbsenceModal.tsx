import Modal from "react-bootstrap/Modal";
import { FC, useState, useEffect } from "react";
import IStudent from "../../models/Student";
import Form from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";
import fetch from "node-fetch";

interface IProps {
  show: boolean;
  onHide: () => any;
  setAbsences: (newAbsences) => void;
}

const classes = [
  "",
  "Informatica",
  "Wiskunde",
  "Aardrijkskunde",
  "Economie",
  "Geschiedenis",
  "Scheikunde",
  "Natuurkunde",
  "Engels",
  "Nederlands",
  "Biologie",
  "Spaans",
  "Frans"
].sort();

const types = ["", "OG", "ZIEK", "GO"];

const NewAbsenceModal: FC<IProps> = ({ show, onHide, setAbsences }) => {
  const [className, setClassName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("OG");
  const [studentId, setStudentId] = useState();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await fetch("/api/student");
    const { data } = await res.json();
    setStudents(data.students);
  };

  const save = async () => {
    const res = await fetch("/api/absence", {
      method: "POST",
      body: JSON.stringify({ className, reason, type, studentId })
    });
    const { success } = await res.json();
    if (success) {
      await reloadAbsences();
    }
    close();
  };

  const reloadAbsences = async () => {
    const res = await fetch("/api/absence");
    const { data } = await res.json();
    setAbsences(data);
  };

  const close = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>Nieuwe absentie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Afwezigheids type</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  onChange={e =>
                    setType(
                      e.target.value === "Kies een type" ? "" : e.target.value
                    )
                  }
                >
                  {types.map((t, i) => (
                    <option
                      disabled={i === 0}
                      selected={i === 0}
                      hidden={i === 0}
                      key={i}
                    >
                      {i === 0 ? "Kies een type" : t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Les</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  onChange={e =>
                    setClassName(
                      e.target.value === "Kies een klas" ? "" : e.target.value
                    )
                  }
                >
                  {classes.map((c, i) => (
                    <option
                      disabled={i === 0}
                      selected={i === 0}
                      hidden={i === 0}
                      key={i}
                    >
                      {i === 0 ? "Kies een klas" : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Student</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  onChange={e =>
                    setStudentId(
                      e.target.value === "Kies een student"
                        ? -1
                        : parseInt(e.target.value)
                    )
                  }
                >
                  {[{ Id: -1, Name: "Kies een student" }, ...students].map(
                    (s, i) => (
                      <option
                        disabled={i === 0}
                        selected={i === 0}
                        hidden={i === 0}
                        key={i}
                        value={s.Id}
                      >
                        {i === 0 ? "Kies een student" : s.Name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col-4 col-form-label">
                <label>Reden</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={close}>
          Annuleren
        </Button>
        <Button variant="primary" onClick={save}>
          Opslaan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAbsenceModal;

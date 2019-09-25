import { FC, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import IStudent, { DefaultStudent } from "../../models/Student";
import Button from "react-bootstrap/Button";
import { Jumbotron } from "react-bootstrap";

interface IProps {
  show: boolean;
  onHide: () => any;
  studentId: number;
}

const StudentModal: FC<IProps> = ({ show, onHide, studentId }) => {
  const [student, setStudent] = useState<IStudent>(DefaultStudent);

  const createMode = studentId === -1;

  useEffect(() => {
    if (studentId && studentId != -1) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    const res = await fetch("/api/student/" + studentId);
    const { data } = await res.json();
    setStudent(data);
    console.log(data);
  };

  const close = () => {
    onHide();
  };

  const save = () => {};

  const deleteMe = () => {};

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>
          {createMode ? "Nieuwe student" : student.Name || "Laden..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Jumbotron>

        </Jumbotron>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={close}>
          Annuleren
        </Button>
        {createMode && <Button variant="danger" onClick={deleteMe}>
          Verwijderen
        </Button>}

        <Button variant="primary" onClick={save}>
          Opslaan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;

import { FC, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import IStudent, { DefaultStudent } from "../../models/Student";

interface IProps {
  show: boolean;
  onHide: () => any;
  studentId: number;
}

const StudentModal: FC<IProps> = ({ show, onHide, studentId }) => {
  const [student, setStudent] = useState<IStudent>(DefaultStudent);

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, []);

  const loadStudent = async () => {
    const res = await fetch("/api/student/" + studentId);
    const { data } = await res.json();
    setStudent(data);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header></Modal.Header>
    </Modal>
  );
};

export default StudentModal;

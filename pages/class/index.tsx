import { NextPage } from "next";
import fetch from "node-fetch";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
interface IProps {
  classes: any[];
}

const ClassPage: NextPage<IProps> = props => {
  const [classes, setClasses] = useState(props.classes);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleClose = () => setShowAddModal(false);
  const handleShow = () => setShowAddModal(true);

  const [className, setClassName] = useState("");

  const addClass = async () => {
    if (!className) return;
    const res = await fetch("/api/class", {
      method: "POST",
      body: JSON.stringify({ name: className })
    });
    const json = await res.json();
    setClasses(prevClasses => [...prevClasses, json]);
    handleClose();
  };

  const deleteClass = async (id: number) => {
    const res = await fetch("/api/class", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    setClasses(prevClasses => prevClasses.filter(c => c.Id != id));
    return false;
  };

  return (
    <div className="class-page my-3">
      {showAddModal}
      <ul className="list-group">
        {classes.map(c => (
          <Link href={`/class/${c.Id}`} key={c.Id}>
            <a className="list-group-item list-group-item-action d-flex justify-content-between text-dark  align-items-center">
              <div className="d-flex flex-row align-items-center">
                <h3 className="mb-1">{c.Name}</h3>
                <span className="badge badge-primary badge-pill ml-2">
                  {c.Students}
                </span>
              </div>
              <div
                onClick={e => {
                  e.preventDefault();
                  deleteClass(c.Id);
                }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-danger"
                  size="2x"
                ></FontAwesomeIcon>
              </div>
            </a>
          </Link>
        ))}
        <a
          className="list-group-item list-group-item-action text-primary"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        >
          <h3>
            <FontAwesomeIcon icon={faPlus} className="mr-3" />
            Nieuwe klas toevoegen
          </h3>
        </a>
      </ul>
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nieuwe klas toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="class-name">
              <Form.Label>Klas naam</Form.Label>
              <Form.Control onChange={e => setClassName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Annuleren
          </Button>
          <Button variant="primary" onClick={addClass}>
            Toevoegen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ClassPage.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `http://${req.headers.host}` : "";
  console.log(baseUrl + "/api/class");
  const res = await fetch(baseUrl + "/api/class");
  const { data } = await res.json();
  return { classes: data };
};

export default ClassPage;

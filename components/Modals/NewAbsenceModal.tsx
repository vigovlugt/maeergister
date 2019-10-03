import Modal from "react-bootstrap/Modal";
import { FC } from "react";
import IStudent from "../../models/Student";
import Form from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";

interface IProps {
    show:boolean;
    onHide: ()=>any;
}

const NewAbsenceModal: FC<IProps> = ({ show, onHide }) => {

    const save = () => {

    }

    const close = () => {
        onHide();
    }

    return <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>
          Nieuwe absentie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <FormGroup>
                <div className="row">
                    <div className="col-4 col-form-label"><label>Naam leerling</label></div>
                    <div className="col-8">
                        {/* <input className="form-control" value={name} onChange={e=>setName(e.target.value)} /> */}
                    </div>
                </div>
            </FormGroup>
            <FormGroup>
                <div className="row">
                    <div className="col-4 col-form-label"><label>Geboortedatum</label></div>
                    <div className="col-8">
                        {/* <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} /> */}
                    </div>
                </div>
            </FormGroup>
            <FormGroup>
                <div className="row">
                    <div className="col-4 col-form-label"><label>Klas</label></div>
                    <div className="col-8">
                        {/* <input className="form-control" value={classTitle} onChange={e=>setClass(e.target.value)} /> */}
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
}

export default NewAbsenceModal;
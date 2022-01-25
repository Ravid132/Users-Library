import { Button } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserModal = ({ handleClose, saveUser, show }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Save Changes?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

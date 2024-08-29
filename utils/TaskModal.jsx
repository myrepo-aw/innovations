import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, handleSave, taskName = '', setTaskName, title }) => (
    <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className="background-primary" closeButton>
            <p className="color-white font-size-18 mb-0">{title}</p>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="taskName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter the task name" 
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="my-button" onClick={handleSave}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
);

export default TaskModal;
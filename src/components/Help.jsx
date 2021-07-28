import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Help = (props) => {
    return(
        <Modal
            show={props.show}
            onHide={props.toggleHelp}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Ripple</h2>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Move Cells</h4>
                <p>Click and Drag Start or End Cells to move them to a new location.</p>
                <h4>Add Walls</h4>
                <p>Drag across blank spaces to create a wall.</p>
                <h4>Remove Walls</h4>
                <p>Drag on walls to remove them.</p>
                <h4>Enjoy</h4>
                <p>Hit go to start the simulation.</p>
            </Modal.Body>
            
            <Modal.Footer>
                <Button onClick={props.toggleHelp}>Close</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default Help;
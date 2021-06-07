import React from 'react';
import {Modal} from 'bootstrap';

const Help = () => {
    return(
        <div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="helpModalLabel">Ripple</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Move Tiles</h5>
                        <p>Click and Drag Start or End Tile to move them to a new location.</p>
                        <h5>Add Walls</h5>
                        <p>Drag across blank spaces to create a wall.</p>
                        <h5>Enjoy</h5>
                        <p>Hit go to start the simulation.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help;
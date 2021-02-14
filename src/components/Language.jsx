import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const Language = (props) => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {props.state.language === 'eng' && 'английский'}
                {props.state.language === 'rus' && 'русский'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={props.state.setRussian}>русский</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={props.state.setEnglish}>английский</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Language
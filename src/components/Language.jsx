import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import actions from '../state/actions'

const Language = ({state, dispatch}) => {
    const setRussian = () => {
        dispatch({type: actions.SET_LANGUAGE, language: 'rus'})
    }
    const setEnglish = () => {
        dispatch({type: actions.SET_LANGUAGE, language: 'eng'})
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {state.language === 'eng' && 'английский'}
                {state.language === 'rus' && 'русский'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={setRussian}>русский</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={setEnglish}>английский</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Language
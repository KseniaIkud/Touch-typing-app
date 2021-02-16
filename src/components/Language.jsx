import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import ACTIONS from '../store/actions'

const Language = ({language, dispatch}) => {
    const setRussian = () => {
        dispatch({type: ACTIONS.SET_LANGUAGE, language: 'rus'})
    }
    const setEnglish = () => {
        dispatch({type: ACTIONS.SET_LANGUAGE, language: 'eng'})
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {language === 'eng' && 'английский'}
                {language === 'rus' && 'русский'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={setRussian}>русский</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={setEnglish}>английский</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Language
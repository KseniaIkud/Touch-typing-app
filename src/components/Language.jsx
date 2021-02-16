import React, {useContext} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

import ACTIONS from '../store/actions';
import {Store} from '../store/reducer';

const Language = () => {
    const {state, dispatch} = useContext(Store);

    const changeLanguage = (language) => {
        dispatch({type: ACTIONS.SET_LANGUAGE, language});
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {state.language === 'eng' && 'английский'}
                {state.language === 'rus' && 'русский'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={() => changeLanguage('rus')}>русский</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => changeLanguage('eng')}>английский</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Language
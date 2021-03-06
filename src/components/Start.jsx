import React, { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from 'react-bootstrap';

import Language from './Language';

import {Store} from '../store/reducer';

const Start = ({onStart}) => {
    const {state} = useContext(Store);
    return (
        <div className={state.isStart ? "w-100 h-75 position-absolute d-flex justify-content-center" : "d-none"}>
                <Alert show={state.isStart} variant="secondary" className="w-25 align-self-center">
                    <Alert.Heading>Проверьте скорость своей печати</Alert.Heading>
                    <p>
                        Наберите небольшой текст, чтобы узнать скорость и точноть набора
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between">
                    <Button onClick={onStart} variant="outline-info">
                        Начать
                    </Button>
                    <Language/>
                    </div>
                </Alert>
            
        </div>
    )
}

export default Start
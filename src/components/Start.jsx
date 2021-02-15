import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Language from './Language';
import {Alert, Button} from 'react-bootstrap';

const Start = ({onStart, state, dispatch}) => {
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
                    <Language language={state.language} dispatch={dispatch}/>
                    </div>
                </Alert>
            
        </div>
    )
}

export default Start
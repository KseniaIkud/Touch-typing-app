import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Language from './Language';
import {Alert, Button} from 'react-bootstrap';

const Result = ({onStart, show, state, dispatch}) => {
    return (
        <div className={show ? "w-100 h-75 position-absolute d-flex justify-content-center" : "d-none"}>
            <Alert show={show} variant="success" className="w-25 align-self-center">
                <Alert.Heading>Ваш результат</Alert.Heading>
                <p>
                    {state.speed} знаков в минуту
                </p>
                <p>
                    {state.accuracy}% точности
                </p>
                <hr />
                <div className="d-flex justify-content-between">
                <Button onClick={onStart} variant="outline-success">
                    Начать заново
                </Button>
                <Language state={state} dispatch={dispatch}/>
                </div>
            </Alert>
        </div>
    )
}

export default Result
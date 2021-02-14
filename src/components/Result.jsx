import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from 'react-bootstrap';

const Result = (props) => {
    return (
        <div className={props.show ? "w-100 h-75 position-absolute d-flex justify-content-center" : "d-none"}>
            <Alert show={props.show} variant="success" className="w-25 align-self-center">
                <Alert.Heading>Ваш результат</Alert.Heading>
                <p>
                    {props.speed} знаков в минуту
                </p>
                <p>
                    {props.accuracy}% точности
                </p>
                <hr />
                <div className="d-flex justify-content-center">
                <Button onClick={props.onStart} variant="outline-success">
                    Начать заново
                </Button>
                </div>
            </Alert>
        </div>
    )
}

export default Result
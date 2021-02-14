import React from 'react';
import {Alert, Button} from 'react-bootstrap';

const Result = (props) => {
    return (
        <>
            <Alert show={props.show} variant="success">
                <Alert.Heading>Ваш результат</Alert.Heading>
                <p>
                    {props.speed} знаков в минуту
                </p>
                <p>
                    {props.accuracy} % точности
                </p>
                <hr />
                <div className="d-flex justify-content-start">
                <Button onClick={props.onStart} variant="outline-success">
                    Начать заново
                </Button>
                </div>
            </Alert>
        </>
    )
}

export default Result
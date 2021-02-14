import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from 'react-bootstrap';

const Start = (props) => {
    return (
        <div className="w-100 h-75 position-absolute d-flex justify-content-center">
                <Alert show={props.show} variant="secondary" className="w-25 align-self-center">
                    <Alert.Heading>Проверьте скорость своей печати</Alert.Heading>
                    <p>
                        Наберите небольшой текст, чтобы узнать скорость и точноть набора
                    </p>
                    <hr />
                    <div className="d-flex justify-content-start">
                    <Button onClick={props.onStart} variant="outline-info">
                        Начать
                    </Button>
                    </div>
                </Alert>
            
        </div>
    )
}

export default Start
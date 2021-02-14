import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Language from './Language';
import {Alert, Button} from 'react-bootstrap';

const Start = (props) => {
    return (
        <div className={props.show ? "w-100 h-75 position-absolute d-flex justify-content-center" : "d-none"}>
                <Alert show={props.show} variant="secondary" className="w-25 align-self-center">
                    <Alert.Heading>Проверьте скорость своей печати</Alert.Heading>
                    <p>
                        Наберите небольшой текст, чтобы узнать скорость и точноть набора
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between">
                    <Button onClick={props.onStart} variant="outline-info">
                        Начать
                    </Button>
                    <Language state={props.language}/>
                    </div>
                </Alert>
            
        </div>
    )
}

export default Start
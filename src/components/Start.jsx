import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button } from 'react-bootstrap';

const Start = () => {
    return (
        <Jumbotron className="w-75 mt-5 mx-auto border">
            <h1>Проверьте скорость своей печати</h1>
            <p>
                Наберите небольшой текст, чтобы узнать скорость и точность набора
            </p>
            <p>
                <Button variant="outline-primary">Начать</Button>
            </p>
        </Jumbotron>
    )
}

export default Start
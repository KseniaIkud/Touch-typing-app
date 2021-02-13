import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button } from 'react-bootstrap';

const Start = () => {
    return (
        <Jumbotron>
            <h1>Проверьте скорость своей печати</h1>
            <p>
                Наберите небольшой текст, чтобы узнать скорость и точность набора
            </p>
            <p>
                <Button variant="primary">Начать</Button>
            </p>
        </Jumbotron>
    )
}

export default Start
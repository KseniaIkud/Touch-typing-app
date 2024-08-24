import React, {useContext} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from 'react-bootstrap';

import Language from './Language';

import {Store} from '../store/reducer';

const Result = ({onStart}) => {
    const {state} = useContext(Store);
    return (
        <div className={state.isResult ? "w-100 h-75 position-absolute d-flex justify-content-center" : "d-none"}>
            <Alert show={state.isResult} variant="success" className="w-25 align-self-center">
                <Alert.Heading>Your result</Alert.Heading>
                <p>
                    {state.speed} symbols in minute
                </p>
                <p>
                    {state.accuracy}% accuracy
                </p>
                <hr />
                <div className="d-flex justify-content-between">
                <Button onClick={onStart} variant="outline-success">
                    Start again
                </Button>
                <Language/>
                </div>
            </Alert>
        </div>
    )
}

export default Result

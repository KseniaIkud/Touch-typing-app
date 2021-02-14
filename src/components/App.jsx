import React, { useState } from 'react';
import './App.css';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import {Alert, Button} from 'react-bootstrap';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const App = () => {

    const[result2, setResult2] = useState({
        speed: 0,
        accuracy: 100
    });
    
    const [outgoingValues, setOutgoingValues] = useState('');
    const [incomingValues, setIncomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [isWrongSymbol, setWrongSymbol] = useState(false);
    const [showResult, setShowResult] = useState (false);
    const [showStart, setShowStart] = useState(true);
    const updateState = () => {
        setOutgoingValues('');
        setStartTime();
        setSpeed(0);
        setAccuracy(100);
        setTypedText('');
        setWrongSymbol(false);
    }
    const onStart = () => {
        setShowResult(false);
        setShowStart(false);
        getText()
            .then(result => {
                let wholeText = result[0];
                setIncomingValues(wholeText.substr(1));
                setCurrentSymbol(wholeText.charAt(0));
                updateState();
            })
            .catch(err => console.log(err))
    };
    const updateAccuracy = (expected, typed) => {
        setResult2({
            ...result2,
            accuracy: ((expected.length * 100) / (typed.length)).toFixed(0,)
        })
        // setAccuracy(((expected.length * 100) / (typed.length)).toFixed(0,));
    }

    useKeyPress((key) => {
        let currentTime = getCurrentTime();
        if (!startTime) {
            setStartTime(currentTime);
        };
        let updatedTypedText = typedText + key;
        let updatedOutgoingValues = outgoingValues;
        if (key === currentSymbol) {
            setTypedText(updatedTypedText);

            updatedOutgoingValues += key;
            setOutgoingValues(updatedOutgoingValues);

            setCurrentSymbol(incomingValues.charAt(0));
            setIncomingValues(incomingValues.substr(1));
            setWrongSymbol(false);
            updateAccuracy(updatedOutgoingValues, updatedTypedText);
            if (startTime && !incomingValues) {
                setOutgoingValues('');
                setShowResult(true)
            }
        } else {
            setWrongSymbol(true);
            if (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1)) {
                setTypedText(updatedTypedText);
                updateAccuracy(updatedOutgoingValues, updatedTypedText);
            }
        }
        if (startTime) {
            const duration = (currentTime - startTime) / 60000;
            const speed = (updatedOutgoingValues.length / duration).toFixed(0,);
            setSpeed(speed);
        }
    })


    return <div className="app">
        <Start show={showStart} onStart={onStart}/>
        <TypingArea outgoingValues={outgoingValues} currentSymbol={currentSymbol} incomingValues={incomingValues} isWrong={isWrongSymbol} speed={result2.speed} accuracy={result2.accuracy} />
        <Result speed={speed} accuracy={accuracy} show={showResult} onStart={onStart}/>
    </div>
}

export default App;

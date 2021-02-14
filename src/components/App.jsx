import React, { useState } from 'react';
import './App.css';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const App = () => {
    
    const [outgoingValues, setOutgoingValues] = useState('');
    const [incomingValues, setIncomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [isWrongSymbol, setWrongSymbol] = useState(false);
    const [showResalt, setShowResult] = useState (false);
    const [showStart, setShowStart] = useState(true);
    const updateState = () => {
        setOutgoingValues('');
        setStartTime();
        setSpeed(0);
        setAccuracy(100);
        setTypedText('');
        setWrongSymbol(false);
    }
    const onTextButtonClick = () => {
        getText()
            .then(result => {
                let wholeText = result[0];
                setIncomingValues(wholeText.substr(1));
                setCurrentSymbol(wholeText.charAt(0));
                updateState();
            })
            .catch(err => console.log(err))
    };
    const onStart = () => {
        setShowResult(false);
        onTextButtonClick();
        setShowStart(false);
    }
    const updateAccuracy = (expected, typed) => {
        setAccuracy(((expected.length * 100) / (typed.length)).toFixed(0,));
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
        <Start/>
        <TypingArea outgoingValues={outgoingValues} currentSymbol={currentSymbol} incomingValues={incomingValues} isWrong={isWrongSymbol} speed={speed} accuracy={accuracy} />
        <Result speed={speed} accuracy={accuracy} show={showResalt} onStart={onStart}/>
        <div className="app__content">
            <div className="start" onClick={onTextButtonClick}>
                Начать
            </div>
            
            <div className="textarea">
                <span>{outgoingValues}</span>
                <span className={`${isWrongSymbol ? "current-symbol_wrong" : "current-symbol"}`}>{currentSymbol}</span>
                <span>{incomingValues}</span>
            </div>
            <div className="result">
                <div>
                    Скорость (знаков в минуту): {speed}
                </div>
                <div>
                    Точность (процент правильных символов): {accuracy}%
                </div>
            </div>
        </div>
    </div>
}

export default App;

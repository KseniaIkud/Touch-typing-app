import React, { useState, useEffect } from 'react';
import './App.css';
import getText from './Api/getText'
import useKeyPress from './useKeyPress'

const App = () => {
    const [isButtonDisabled, setButtonDisable] = useState(false)
    const [outgoingValues, setoutgoingValues] = useState('');
    const [incomingValues, setincomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [isWrongSymbol, setWrongSymbol] = useState(false);
    const updateState = () => {
        setoutgoingValues('');
        setStartTime();
        setSpeed(0);
        setAccuracy(100);
        setTypedText('');
        setWrongSymbol(false);
    }
    const onTextButtonClick = (e) => {
        setButtonDisable(true)
        getText()
            .then(result => {
                let wholeText = result[0];
                setincomingValues(wholeText.substr(1));
                setCurrentSymbol(wholeText.charAt(0));
                updateState();
            })
    };
    const updateAccuracy = (expected, typed) => {
        setAccuracy(((expected.length * 100) / (typed.length)).toFixed(0,));
    }

    useKeyPress((key) => {
        if (!startTime) {
            setStartTime(new Date().getTime());
        }

        let updatedTypedText = typedText + key;
        let updatedOutgoingValues = outgoingValues;
        if (key === currentSymbol) {
            setTypedText(updatedTypedText);

            updatedOutgoingValues += key;
            setoutgoingValues(updatedOutgoingValues);

            setCurrentSymbol(incomingValues.charAt(0));
            setincomingValues(incomingValues.substr(1));
            setWrongSymbol(false);
            updateAccuracy(updatedOutgoingValues, updatedTypedText);
            if (startTime && !incomingValues) {
                setoutgoingValues('');
                setButtonDisable(false);
            }
        } else {
            setWrongSymbol(true);
            if (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1)) {
                setTypedText(updatedTypedText);
                updateAccuracy(updatedOutgoingValues, updatedTypedText);
            }
        }
        const currentTime = new Date().getTime();
        const duration = (currentTime - startTime) / 60000;
        setSpeed((updatedOutgoingValues.length / duration).toFixed(2,));
    })


    return <div className="app">
        <div className="app__content">
            <button disabled={isButtonDisabled} className="start" onClick={onTextButtonClick}>
                Начать
            </button>
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

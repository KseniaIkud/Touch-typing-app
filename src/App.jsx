import React, { useState, useEffect } from 'react';
import './App.css';
import getText from './Api/getText'
import useKeyPress from './useKeyPress'

const App = () => {
    const [outgoingValues, setoutgoingValues] = useState('');
    const [incomingValues, setincomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [wrongSymbol, setWrongSymbol] = useState(false);

    const onTextButtonClick = () => {
        getText()
            .then(result => {
                let wholeText = result[0];
                setCurrentSymbol(wholeText.charAt(0));
                setincomingValues(wholeText.substr(1));
                setoutgoingValues('');
                setAccuracy(100);
                setSpeed(0);
            })
    };
    const onStartTyping = () => {
        setStartTime(new Date().getTime())
    }
    const onFinishTyping = () => {
        setoutgoingValues('')
    }

    useKeyPress((key) => {
        if (!startTime) {
            onStartTyping();
        }
        if (key === currentSymbol) {
            setoutgoingValues(outgoingValues + key);
            setCurrentSymbol(incomingValues.charAt(0));
            setincomingValues(incomingValues.substr(1));
            setWrongSymbol(false);
            if (startTime && !incomingValues) {
                onFinishTyping();
            }
        } else {
            setWrongSymbol(true)
        }
        const currentTime = new Date().getTime();
        const duration = (currentTime - startTime) / 60000;
        setSpeed(((outgoingValues + key).length / duration));
        setTypedText(typedText + key);
        setAccuracy((((outgoingValues + key).length * 100) / (typedText + key).length).toFixed(1,));
    })


    return <div className="app">
        <div className="app__content">
            <button className="restart" onClick={onTextButtonClick}>
                Задать текст
            </button>
            <div className="textarea">
                <span>{outgoingValues}</span>
                <span className={`${wrongSymbol ? "current-symbol_wrong" : "current-symbol"}`}>{currentSymbol}</span>
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
            <button className="restart">Начать заново</button>
        </div>
    </div>
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import getText from './Api/getText'
import useKeyPress from './useKeyPress'

const App = () => {
    const [text, setText] = useState();
    const [outgoingValues, setoutgoingValues] = useState();
    const [incomingValues, setincomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('')
    const onTextButtonClick = () => {
        getText()
            .then(result => {
                setText(result[0]);
                setincomingValues(result[0].substr(1));
                setCurrentSymbol(result[0](0));
            })
    };
    const onStartTyping = () => {
        setStartTime(new Date().getTime())
    }
    const onFinishTyping = () => {
        const finishTime = new Date().getTime()
        setSpeed((finishTime - startTime)/60000)
    }
    const onTyping = (key) => {
        setTypedText(typedText + key)
        setAccuracy( (outgoingValues.length * 100) / (typedText + key).length)
    }
    

    return <div className="app">
        <div className="app__content">
            <button className="restart" onClick={onTextButtonClick}>
                Задать текст
            </button>
            <div className="textarea">
                {text || ''}
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

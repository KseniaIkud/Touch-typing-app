import React, { useState, useEffect } from 'react';
import './App.css';
import getText from './Api/getText'

const App = () => {
    const [state, setState] = useState({})
    const setText = () => {
        getText()
        .then(result => setState({text: result}))
    }
    
    
    return <div className="app">
        <div className="app__content">
            <button className="restart" onClick={setText}>
                Задать текст
            </button>
            <div className="textarea">
                {state.text || ''}
            </div>
            <div className="result">
                <div>
                    Скорость (знаков в минуту):
                </div>
                <div>
                    Точность (процент правильных символов):
                </div>
            </div>
            <button className="restart">Начать заново</button>
        </div>
    </div>
}

export default App;

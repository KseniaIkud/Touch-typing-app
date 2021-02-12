import React from 'react';
import './App.css';

const App = () => {
    return <div className="app">
        <div className="app__content">
            <textarea className="textarea" name="text" id="text" cols="30" rows="10">
                Text
            </textarea>
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

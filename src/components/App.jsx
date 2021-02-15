import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';

import useKeyPress from '../hooks/useKeyPress';
import ACTIONS from '../state/actions';
import reducer from '../state/reducer';

import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const initialState = {
    text: {
        outgoingValues: '',
        typedText: '',
        incomingValues: '',
        length: 0, 
        currentSymbol: '',
        isSymbolWrong: false,
        startTime: null,
    },
    result: {
        speed: 0,
        accuracy: 100,
    },
    language: 'rus'
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showStart, setShowStart] = useState(true);
    const [showResult, setShowResult] = useState (false);
    
    const onStart = () => {
        setShowStart(false);
        setShowResult(false);
        dispatch({type: ACTIONS.RESET_STATE})
        if (state.language === 'rus') {
            getText.getCyrillicText()
            .then(result => {
                dispatch({type: ACTIONS.SET_TEXT, result})
            })
            .catch(err => console.log(err))
        } else if (state.language === 'eng') {
            getText.getLatinText()
            .then(result => {
                dispatch({type: ACTIONS.SET_TEXT, result})
            })
            .catch(err => console.log(err))
        }
    };

    const onKeyPress = (key) => {
        if (!state.text.startTime) {
            dispatch({type: ACTIONS.START, time: getCurrentTime()})
        };
        if (key === state.text.currentSymbol) {
            dispatch({type: ACTIONS.SET_RIGHT_KEY, key})
            let isFinished = (state.text.startTime && !state.text.incomingValues)
            if (isFinished) { 
                dispatch({type: ACTIONS.COMPLETE})
                setShowResult(true);
            }
        } else {
            dispatch({type: ACTIONS.WRONG_SYMBOL})
            let isMistakeNew = state.text.typedText.substr(-1) === state.text.outgoingValues.substr(-1);
            if (isMistakeNew) {
                let accuracy = ((state.text.outgoingValues.length * 100) / (state.text.typedText.length + 1)).toFixed(0,)
                dispatch({type: ACTIONS.SET_ACCURACY, accuracy})
                dispatch({type: ACTIONS.UPDATE_TYPED_TEXT, key})
            }
        }
        if (state.text.startTime) {
            const duration = (getCurrentTime() - state.text.startTime) / 60000;
            const speed = (state.text.outgoingValues.length / duration).toFixed(0,);
            dispatch({type: ACTIONS.SET_SPEED, speed})
        }
    }

    useKeyPress(onKeyPress)
    return (
        <div>
           <Start onStart={onStart} show={showStart} language={state.language} dispatch={dispatch}/>
           <Result onStart={onStart} show={showResult} result={state.result} 
                language={state.language}  dispatch={dispatch}/>
           <TypingArea onStart={onStart} state={state} />
        </div>
    )
}

export default App;

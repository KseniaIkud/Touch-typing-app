import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';

import useKeyPress from '../hooks/useKeyPress';
import actions from '../state/actions';
import reducer from '../state/reducer';

import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const initialState = {
    length: 0,
    outgoingValues: '', 
    incomingValues: '',
    currentSymbol: '',
    isSymbolWrong: false,
    startTime: null,
    speed: 0,
    accuracy: 100,
    typedText: '',
    language: 'rus'
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showStart, setShowStart] = useState(true);
    const [showResult, setShowResult] = useState (false);
    
    const onStart = () => {
        setShowStart(false);
        setShowResult(false);
        dispatch({type: actions.RESET_STATE})
        if (state.language === 'rus') {
            getText.getCyrillicText()
            .then(result => {
                dispatch({type: actions.SET_TEXT, result})
            })
            .catch(err => console.log(err))
        } else if (state.language === 'eng') {
            getText.getLatinText()
            .then(result => {
                dispatch({type: actions.SET_TEXT, result})
            })
            .catch(err => console.log(err))
        }
    };

    const onKeyPress = (key) => {
        if (!state.startTime) {
            dispatch({type: actions.START, time: getCurrentTime()})
        };
        if (key === state.currentSymbol) {
            dispatch({type: actions.SET_RIGHT_KEY, key})
            let isFinished = (state.startTime && !state.incomingValues)
            if (isFinished) {
                dispatch({type: actions.COMPLETE})
                setShowResult(true);
            }
        } else {
            dispatch({type: actions.WRONG_SYMBOL})
            let isMistakeNew = state.typedText.substr(-1) === state.outgoingValues.substr(-1);
            if (isMistakeNew) {
                let accuracy = ((state.outgoingValues.length * 100) / (state.typedText.length + 1)).toFixed(0,)
                dispatch({type: actions.SET_ACCURACY, accuracy})
                dispatch({type: actions.UPDATE_TYPED_TEXT, key})
            }
        }
        if (state.startTime) {
            const duration = (getCurrentTime() - state.startTime) / 60000;
            const speed = (state.outgoingValues.length / duration).toFixed(0,);
            dispatch({type: actions.SET_SPEED, speed})
        }
    }

    useKeyPress(onKeyPress)
    return (
        <div>
           <Start onStart={onStart} show={showStart} state={state} dispatch={dispatch}/>
           <Result onStart={onStart} show={showResult} state={state} dispatch={dispatch}/>
           <TypingArea onStart={onStart} state={state} />
        </div>
    )
}

export default App;

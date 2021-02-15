import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';

import useKeyPress from '../hooks/useKeyPress';
import ACTIONS from '../state/actions';
import reducer from '../state/reducer';

import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';
import initialState from '../state/initialState'


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onStart = () => {
        dispatch({ type: ACTIONS.RESET_STATE })
        if (state.language === 'rus') {
            getText.getCyrillicText()
                .then(result => {
                    dispatch({ type: ACTIONS.SET_TEXT, result })
                })
        } else if (state.language === 'eng') {
            getText.getLatinText()
                .then(result => {
                    dispatch({ type: ACTIONS.SET_TEXT, result })
                })
        }
    };

    const onKeyPress = (key) => {
        dispatch({ type: ACTIONS.START, time: getCurrentTime() });

        let isTyping = state.startTime && state.outgoingValues;
        if (isTyping) {
            dispatch({ type: ACTIONS.SET_SPEED, time: getCurrentTime() })
        }
        
        if (key === state.currentSymbol) {
            dispatch({ type: ACTIONS.SET_RIGHT_KEY, key })
            let isFinished = (state.startTime && !state.incomingValues)
            if (isFinished) {
                dispatch({ type: ACTIONS.COMPLETE })
            }
            
        } else {
            dispatch({ type: ACTIONS.WRONG_SYMBOL })

            let isMistakeNew = state.typedText.substr(-1) === state.outgoingValues.substr(-1);
            if (isMistakeNew) {
                dispatch({ type: ACTIONS.SET_WRONG_KEY, key })
            }
        }
    }

    useKeyPress(onKeyPress)


    return (
        <div>
            <Start onStart={onStart} state={state} dispatch={dispatch} />
            <Result onStart={onStart} state={state} dispatch={dispatch} />
            <TypingArea onStart={onStart} state={state} />
        </div>
    )
}

export default App;

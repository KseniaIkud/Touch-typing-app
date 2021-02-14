import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';
import actions from '../state/actions'
import reducer from '../state/reducer'


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
        const updateAccuracy = (expected, typed) => {
            return ((expected.length * 100) / (typed.length)).toFixed(0,) 
        }
        let currentTime = getCurrentTime();
        if (!state.startTime) {
            dispatch({type: actions.START, time: currentTime})
        };
        dispatch({type: actions.SET_TYPED_TEXT, text: state.typedText + key})
        let updatedTypedText = state.typedText + key;
        let updatedOutgoingValues = state.outgoingValues;
        if (key === state.currentSymbol) {
            updatedOutgoingValues += key;
            dispatch({type: actions.SET_TYPED_TEXT, text: updatedTypedText})
            dispatch({type: actions.SET_OUTGOING_VALUES, outgoingValues: updatedOutgoingValues})
            dispatch({type: actions.SET_CURRENT_SYMBOL, currentSymbol: state.incomingValues.charAt(0)})
            dispatch({type: actions.SET_INCOMING_VALUES, incomingValues: state.incomingValues.substr(1)})
            dispatch({type: actions.RIGHT_SYMBOL})
            let accuracy = updateAccuracy(updatedOutgoingValues, updatedTypedText);
            dispatch({type: actions.SET_ACCURACY, accuracy})
            let isFinished = (state.startTime && !state.incomingValues)
            if (isFinished) {
                dispatch({type: actions.SET_OUTGOING_VALUES, outgoingValues: ''})
                setShowResult(true);
            }
        } else {
            dispatch({type: actions.WRONG_SYMBOL})
            let isSameMistake = (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1))
            if (isSameMistake) {
                dispatch({type: actions.SET_TYPED_TEXT, text: updatedTypedText})
                let accuracy = updateAccuracy(updatedOutgoingValues, updatedTypedText);
                dispatch({type: actions.SET_ACCURACY, accuracy})
            }
        }
        if (state.startTime) {
            const duration = (currentTime - state.startTime) / 60000;
            const speed = (updatedOutgoingValues.length / duration).toFixed(0,);
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

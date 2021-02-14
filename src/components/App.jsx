import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const RESET_STATE = 'RESET_STATE';
const SET_TEXT = 'SET_TEXT';

const SET_OUTGOING_VALUES = 'SET_OUTGOING_VALUES';
const SET_INCOMING_VALUES = 'SET_INCOMING_VALUES';
const SET_CURRENT_SYMBOL = 'SET_CURRENT_SYMBOL';
const WRONG_SYMBOL = 'WRONG_SYMBOL';
const RIGHT_SYMBOL = 'RIGHT_SYMBOL';
const SET_LENGTH = 'SET_LENGTH';
const START = 'START';
const SET_SPEED = 'SET_SPEED';
const SET_ACCURACY = 'SET_ACCURACY';
const SET_TYPED_TEXT = 'SET_TYPED_TEXT';
const SET_LANGUAGE = 'SET_LANGUAGE';



function reducer(state, action) {
    switch (action.type) {
        case RESET_STATE: 
            return  {
                ...state,
                outgoingValues: '',
                isSymbolWrong: false,
                startTime: null,
                speed: 0,
                accuracy: 100,
                typedText: ''
            }
        case SET_TEXT:
            return {
                ...state,
                incomingValues: action.result.substr(1),
                currentSymbol: action.result.charAt(0),
                length: action.result.length
                
            }
        case SET_OUTGOING_VALUES:
            return {
                ...state,
                outgoingValues: action.outgoingValues
            }
        case SET_INCOMING_VALUES:
            return {
                ...state,
                incomingValues: action.incomingValues
            }
        case SET_CURRENT_SYMBOL: 
            return {
                ...state,
                currentSymbol: action.currentSymbol
            }
        case WRONG_SYMBOL: 
            return {
                ...state,
                isSymbolWrong: true
            }
        case RIGHT_SYMBOL: 
            return {
                ...state,
                isSymbolWrong: false
            }
        case SET_LENGTH: 
            return {
                ...state,
                length: action.length
            }
        case START: 
            return {
                ...state,
                startTime: action.time
            }
        case SET_SPEED:
            return {
                ...state,
                speed: action.speed
            }
        case SET_ACCURACY:
            return {
                ...state,
                accuracy: action.accuracy
            }
        case SET_TYPED_TEXT:
            return {
                ...state,
                typedText: action.text
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}
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
        dispatch({type: RESET_STATE})
        if (state.language === 'rus') {
            getText.getCyrillicText()
            .then(result => {
                dispatch({type: SET_TEXT, result})
            })
            .catch(err => console.log(err))
        } else if (state.language === 'eng') {
            getText.getLatinText()
            .then(result => {
                dispatch({type: SET_TEXT, result})
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
            dispatch({type: START, time: currentTime})
        };
        dispatch({type: SET_TYPED_TEXT, text: state.typedText + key})
        let updatedTypedText = state.typedText + key;
        let updatedOutgoingValues = state.outgoingValues;
        if (key === state.currentSymbol) {
            updatedOutgoingValues += key;
            dispatch({type: SET_TYPED_TEXT, text: updatedTypedText})
            dispatch({type: SET_OUTGOING_VALUES, outgoingValues: updatedOutgoingValues})
            dispatch({type: SET_CURRENT_SYMBOL, currentSymbol: state.incomingValues.charAt(0)})
            dispatch({type: SET_INCOMING_VALUES, incomingValues: state.incomingValues.substr(1)})
            dispatch({type: RIGHT_SYMBOL})
            let accuracy = updateAccuracy(updatedOutgoingValues, updatedTypedText);
            dispatch({type: SET_ACCURACY, accuracy})
            let isFinished = (state.startTime && !state.incomingValues)
            if (isFinished) {
                dispatch({type: SET_OUTGOING_VALUES, outgoingValues: ''})
                setShowResult(true);
            }
        } else {
            dispatch({type: WRONG_SYMBOL})
            let isSameMistake = (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1))
            if (isSameMistake) {
                dispatch({type: SET_TYPED_TEXT, text: updatedTypedText})
                let accuracy = updateAccuracy(updatedOutgoingValues, updatedTypedText);
                dispatch({type: SET_ACCURACY, accuracy})
            }
        }
        if (state.startTime) {
            const duration = (currentTime - state.startTime) / 60000;
            const speed = (updatedOutgoingValues.length / duration).toFixed(0,);
            dispatch({type: SET_SPEED, speed})
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

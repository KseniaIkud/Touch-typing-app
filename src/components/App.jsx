import React, { useState, useReducer } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const SET_OUTGOING_VALUES = 'SET_OUTGOING_VALUES';
const SET_INCOMING_VALUES = 'SET_INCOMING_VALUES';
const SET_CURRENT_SYMBOL = 'SET_CURRENT_SYMBOL';
const WRONG_SYMBOL = 'WRONG_SYMBOL';
const RIGHT_SYMBOL = 'RIGHT_SYMBOL';
function reducer(state, action) {
    switch (action.type) {
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
        case SET_CURRENT_SYMBOL: {
            return {
                ...state,
                currentSymbol: action.currentSymbol
            }
        }
        case WRONG_SYMBOL: {
            return {
                ...state,
                isSymbolWrong: true
            }
        }
        case RIGHT_SYMBOL: {
            return {
                ...state,
                isSymbolWrong: false
            }
        }
        default:
            return state
    }
}
const initialState = {
    outgoingValues: '', 
    incomingValues: '',
    currentSymbol: '',
    isSymbolWrong: false
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [showStart, setShowStart] = useState(true);
    const [showResult, setShowResult] = useState (false);
    const [language, setLanguage] = useState('rus');

    let textState = {
        text: state.outgoingValues + state.currentSymbol + state.incomingValues,
        incomingValues: state.incomingValues, 
        outgoingValues: state.outgoingValues,
        currentSymbol: state.currentSymbol,
        isWrongSymbol: state.isSymbolWrong
    }
    let resultState = {
        accuracy,
        speed
    }
    let languageState = {
        language,
        setRussian() {
            setLanguage('rus')    
        },
        setEnglish() {
            setLanguage('eng')
        }
    }
    
    const updateState = () => {
        dispatch({type: SET_OUTGOING_VALUES, outgoingValues: ''})
        setStartTime();
        setSpeed(0);
        setAccuracy(100);
        setTypedText('');
        dispatch({type: RIGHT_SYMBOL})
    }
    const onStart = () => {
        setShowStart(false);
        setShowResult(false);
        updateState();
        if (language === 'rus') {
            getText.getCyrillicText()
            .then(result => {
                dispatch({type: SET_INCOMING_VALUES, incomingValues: result.substr(1)})
                dispatch({type: SET_CURRENT_SYMBOL, currentSymbol: result.charAt(0)})
                
            })
            .catch(err => console.log(err))
        } else if (language === 'eng') {
            getText.getLatinText()
            .then(result => {
                dispatch({type: SET_INCOMING_VALUES, incomingValues: result.substr(1)})
                dispatch({type: SET_CURRENT_SYMBOL, currentSymbol: result.charAt(0)})
            })
            .catch(err => console.log(err))
        }
    };

    const onKeyPress = (key) => {
        const updateAccuracy = (expected, typed) => {
            setAccuracy(((expected.length * 100) / (typed.length)).toFixed(0,));
        }
        let currentTime = getCurrentTime();
        if (!startTime) {
            setStartTime(currentTime);
        };
        let updatedTypedText = typedText + key;
        let updatedOutgoingValues = state.outgoingValues;

        if (key === state.currentSymbol) {
            setTypedText(updatedTypedText);

            updatedOutgoingValues += key;
            dispatch({type: SET_OUTGOING_VALUES, outgoingValues: updatedOutgoingValues})
            dispatch({type: SET_CURRENT_SYMBOL, currentSymbol: state.incomingValues.charAt(0)})
            dispatch({type: SET_INCOMING_VALUES, incomingValues: state.incomingValues.substr(1)})
            dispatch({type: RIGHT_SYMBOL})
            updateAccuracy(updatedOutgoingValues, updatedTypedText);
            let isFinished = (startTime && !state.incomingValues)
            if (isFinished) {
                dispatch({type: SET_OUTGOING_VALUES, outgoingValues: ''})
                setShowResult(true);
            }
        } else {
            dispatch({type: WRONG_SYMBOL})
            let isSameMistake = (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1))
            if (isSameMistake) {
                setTypedText(updatedTypedText);
                updateAccuracy(updatedOutgoingValues, updatedTypedText);
            }
        }
        if (startTime) {
            const duration = (currentTime - startTime) / 60000;
            const speed = (updatedOutgoingValues.length / duration).toFixed(0,);
            setSpeed(speed);
        }
    }

    useKeyPress(onKeyPress)
    return (
        <div>
           <Start onStart={onStart} show={showStart} language={languageState}/>
           <Result onStart={onStart} show={showResult} result={resultState} language={languageState}/>
           <TypingArea onStart={onStart} result={resultState} text={textState} />
        </div>
    )
}

export default App;

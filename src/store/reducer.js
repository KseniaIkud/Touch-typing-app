import React from 'react';
import ACTIONS from './actions';


export const Store = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.RESET_STATE:
            return {
                ...state,
                outgoingValues: '',
                typedText: '',
                currentSymbol: '',
                incomingValues: '',
                isSymbolWrong: false,
                startTime: null,
                textLength: 0,
                speed: 0,
                accuracy: 100,
                isStart: false,
                isResult: false,
                _mistakes: 0,
                _duration: 0
            }
        case ACTIONS.SET_TEXT:
            return {
                ...state,
                incomingValues: action.result.substr(1),
                textLength: action.result.length,
                currentSymbol: action.result.charAt(0),
            }
        case ACTIONS.START:
            return {
                ...state,
                startTime: state.startTime || action.time
            }
        case ACTIONS.SET_SPEED:
            return {
                ...state,
                _duration: (action.time - state.startTime) / 60000,
                speed: state._duration ?
                    (state.outgoingValues.length / state._duration).toFixed(0,) : 0
            }
        case ACTIONS.SET_RIGHT_KEY:
            return {
                ...state,
                outgoingValues: state.outgoingValues + action.key,
                typedText: state.typedText + action.key,
                incomingValues: state.incomingValues.substr(1),
                currentSymbol: state.incomingValues.charAt(0),
                isSymbolWrong: false
            }
        case ACTIONS.COMPLETE:
            return {
                ...state,
                isResult: true,
                outgoingValues: ''
            }
        case ACTIONS.WRONG_SYMBOL:
            return {
                ...state,
                isSymbolWrong: true
            }
        case ACTIONS.SET_WRONG_KEY:
            return {
                ...state,
                typedText: state.typedText + action.key,
                accuracy: (100 - ((state._mistakes + 1) * 100 / state.textLength)).toFixed(1,),
                _mistakes: state._mistakes + 1
            }

        case ACTIONS.SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}

export default reducer;
import React from 'react';

import ACTIONS from './actions';
import initialState from './initialState';

export const Store = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.RESET_STATE:
            return {
                ...initialState,
                isStart: false,
                language: state.language
            }
        case ACTIONS.SET_TEXT:
            return {
                ...state,
                incomingValues: action.result.substr(1),
                _textLength: action.result.length,
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
                isSymbolWrong: false,
                percent: ((state.outgoingValues.length + 1) * 100) / state._textLength
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
                accuracy: (100 - ((state._mistakes + 1) * 100 / state._textLength)).toFixed(1,),
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
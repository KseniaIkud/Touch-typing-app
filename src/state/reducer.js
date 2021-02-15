import ACTIONS from './actions';
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.RESET_STATE: 
            return  {
                ...state,
                text: {
                    ...state.text,
                    outgoingValues: '',
                    typedText: '',
                    isSymbolWrong: false,
                    startTime: null,
                },
                result: {
                    ...state.result,
                    speed: 0,
                    accuracy: 100,
                },
                isStart: false,
                isResult: false
            }
        case ACTIONS.SET_TEXT:
            return {
                ...state,
                text: {
                    ...state.text,
                    incomingValues: action.result.substr(1),
                    length: action.result.length,
                    currentSymbol: action.result.charAt(0),
                },
            }
        case ACTIONS.SET_RIGHT_KEY:
            return {
                ...state,
                text: {
                    ...state.text,
                    outgoingValues: state.text.outgoingValues + action.key,
                    typedText: state.text.typedText + action.key,
                    incomingValues: state.text.incomingValues.substr(1),
                    currentSymbol: state.text.incomingValues.charAt(0),
                    isSymbolWrong: false,
                },
                result: {
                    ...state.result,
                    accuracy: (((state.text.outgoingValues.length + 1) * 100) / (state.text.typedText.length + 1)).toFixed(0,)
                }           
            }
        case ACTIONS.COMPLETE:
            return {
                ...state,
                isResult: true,
                text: {
                    ...state.text,
                    outgoingValues: ''
                }
            }
        case ACTIONS.UPDATE_TYPED_TEXT:
            return {
                ...state,
                text: {
                    ...state.text,
                    typedText: state.text.typedText + action.key
                }
            }
        case ACTIONS.WRONG_SYMBOL: 
            return {
                ...state,
                text: {
                    ...state.text,
                    isSymbolWrong: true
                }
            }
        
        case ACTIONS.START: 
            return {
                ...state,
                text: {
                    ...state.text,
                    startTime: action.time
                }
            }
        case ACTIONS.SET_SPEED:
            return {
                ...state,
                result: {
                    ...state.result,
                    speed: action.speed
                }
            }
        case ACTIONS.SET_ACCURACY:
            return {
                ...state,
                result: {
                    accuracy: action.accuracy
                }
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
import actions from './actions';
function reducer(state, action) {
    switch (action.type) {
        case actions.RESET_STATE: 
            return  {
                ...state,
                outgoingValues: '',
                isSymbolWrong: false,
                startTime: null,
                speed: 0,
                accuracy: 100,
                typedText: ''
            }
        case actions.SET_TEXT:
            return {
                ...state,
                incomingValues: action.result.substr(1),
                currentSymbol: action.result.charAt(0),
                length: action.result.length
                
            }
        case actions.SET_OUTGOING_VALUES:
            return {
                ...state,
                outgoingValues: action.outgoingValues
            }
        case actions.SET_INCOMING_VALUES:
            return {
                ...state,
                incomingValues: action.incomingValues
            }
        case actions.SET_CURRENT_SYMBOL: 
            return {
                ...state,
                currentSymbol: action.currentSymbol
            }
        case actions.WRONG_SYMBOL: 
            return {
                ...state,
                isSymbolWrong: true
            }
        case actions.RIGHT_SYMBOL: 
            return {
                ...state,
                isSymbolWrong: false
            }
        case actions.SET_LENGTH: 
            return {
                ...state,
                length: action.length
            }
        case actions.START: 
            return {
                ...state,
                startTime: action.time
            }
        case actions.SET_SPEED:
            return {
                ...state,
                speed: action.speed
            }
        case actions.SET_ACCURACY:
            return {
                ...state,
                accuracy: action.accuracy
            }
        case actions.SET_TYPED_TEXT:
            return {
                ...state,
                typedText: action.text
            }
        case actions.SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}

export default reducer;
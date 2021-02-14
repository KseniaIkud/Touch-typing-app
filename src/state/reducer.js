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
        case actions.SET_RIGHT_KEY:
            return {
                ...state,
                typedText: state.typedText + action.key,
                outgoingValues: state.outgoingValues + action.key,
                currentSymbol: state.incomingValues.charAt(0),
                incomingValues: state.incomingValues.substr(1),
                isSymbolWrong: false,
                accuracy: (((state.outgoingValues.length + 1) * 100) / (state.typedText.length + 1)).toFixed(0,)
            }
        case actions.COMPLETE:
            return {
                ...state,
                outgoingValues: ''
            }
        case actions.UPDATE_TYPED_TEXT:
            return {
                ...state,
                typedText: state.typedText + action.key
            }
        
        case actions.WRONG_SYMBOL: 
            return {
                ...state,
                isSymbolWrong: true
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
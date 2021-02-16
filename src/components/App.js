import React, { useReducer } from 'react';
import reducer, {Store} from '../store/reducer';
import initialState from '../store/initialState'
import TypeTest from './TypeTest'


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <Store.Provider value={{dispatch, state}}>
            <TypeTest />
        </Store.Provider>
    )
}

export default App;

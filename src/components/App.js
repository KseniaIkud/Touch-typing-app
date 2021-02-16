import React, { useReducer } from 'react';
import reducer, {Store} from '../store/reducer';
import initialState from '../store/initialState';
import TypeTextTest from './TypeTextTest';


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <Store.Provider value={{dispatch, state}}>
            <TypeTextTest />
        </Store.Provider>
    )
}

export default App;

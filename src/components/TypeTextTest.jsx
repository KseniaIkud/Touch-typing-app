import React, { useContext } from 'react';
import { Store } from '../store/reducer';
import ACTIONS from '../store/actions';

import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../utils/useKeyPress';

import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const TypeTextTest = () => {
    const { state, dispatch } = useContext(Store);

    const onStart = () => {
        dispatch({ type: ACTIONS.RESET_STATE });
        getText(state.language)
            .then(result => {
                dispatch({ type: ACTIONS.SET_TEXT, result });
            });
    };

    const onKeyPress = (key) => {
        dispatch({ type: ACTIONS.START, time: getCurrentTime() });
        
        let isTyping = Boolean(state.startTime && state.outgoingValues);
        if (isTyping) {
            dispatch({ type: ACTIONS.SET_SPEED, time: getCurrentTime() });
        };

        if (key === state.currentSymbol) {
            dispatch({ type: ACTIONS.SET_RIGHT_KEY, key });

            let isFinished = Boolean(state.startTime && !state.incomingValues);
            if (isFinished) {
                dispatch({ type: ACTIONS.COMPLETE });
            };

        } else {
            dispatch({ type: ACTIONS.WRONG_SYMBOL });

            let isMistakeNew = state.typedText.substr(-1) === state.outgoingValues.substr(-1);
            if (isMistakeNew) {
                dispatch({ type: ACTIONS.SET_WRONG_KEY, key });
            };
        };
    };

    useKeyPress(onKeyPress);

    return <div>
        <Start onStart={onStart} />
        <Result onStart={onStart} />
        <TypingArea onStart={onStart} />
    </div>
}

export default TypeTextTest
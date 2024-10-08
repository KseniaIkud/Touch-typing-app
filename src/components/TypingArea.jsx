import React, {useContext} from 'react';

import classes from './TypingArea.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';

import restart from '../icons/restart.png';

import {Store} from '../store/reducer';

const TypingArea = ({onStart}) => {
    const {state} = useContext(Store);
    return (
        <div className={classes.typingArea}>
            <div className={classes.header}>
                <ProgressBar now={state.percent} variant="success" animated className="w-75"/>
                <img src={restart} alt="restart" width="40" className={classes.restart} 
                    onClick={onStart}/>
            </div>
            <div className={classes.content}>
                <div className={classes.text}>
                    <span className={classes.outgoingValue}>
                        {state.outgoingValues}
                    </span>
                    <span className={`${classes.key} ${state.isSymbolWrong && classes.keyWrong}`}>
                        {state.currentSymbol}
                    </span>
                    <span>{state.incomingValues}</span>
                </div>
                <div className={classes.result}>
                    <div>
                        Speed 
                        <div>
                            {state.speed} cpm
                        </div>
                    </div>
                    
                    <div>
                        Accuracy
                        <div>
                            {state.accuracy}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingArea

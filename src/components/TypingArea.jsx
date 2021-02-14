import React from 'react';
import classes from './TypingArea.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';
import restart from '../icons/restart.png';

const TypingArea = (props) => {
    let percent = props.text.outgoingValues ? 
        ((props.text.outgoingValues.length * 100) / props.text.text.length) : 0
    return (
        <div className={classes.typingArea}>
            <div className={classes.header}>
                <ProgressBar now={percent} variant="success" animated className="w-75"/>
                <img src={restart} alt="restart" width="40" className={classes.restart} onClick={props.onStart}/>
            </div>
            <div className={classes.content}>
                <div className={classes.text}>
                    <span className={classes.outgoingValue}>
                        {props.text.outgoingValues}
                    </span>
                    <span className={`${classes.key} ${props.text.isWrongSymbol && classes.keyWrong}`}>
                        {props.text.currentSymbol}
                    </span>
                    <span>{props.text.incomingValues}</span>
                </div>
                <div className={classes.result}>
                    <div>
                        Скорость 
                        <div>
                            {props.result.speed} зн/мин
                        </div>
                    </div>
                    
                    <div>
                        Точность
                        <div>
                            {props.result.accuracy}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingArea
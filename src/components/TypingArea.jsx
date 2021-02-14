import React from 'react';
import classes from './TypingArea.module.css';
import {ProgressBar} from 'react-bootstrap';
import restart from '../icons/restart.png';

const TypingArea = (props) => {
    return <div className={classes.typingArea}>
        <div className={classes.header}>
            <ProgressBar now={60} variant="success" animated className="w-75"/>
            <img src={restart} alt="restart" width="40" className={classes.restart}/>
        </div>
        <div className={classes.content}>
            <div className={classes.text}>
                <span className={classes.outgoingValue}>
                    {props.outgoingValues}
                </span>
                <span className={`${props.isWrong ? classes.keyWrong : classes.keySuccess}`}>
                    {props.currentSymbol}
                </span>
                <span>{props.incomingValues}</span>
            </div>
            <div className={classes.result}>
                <div>
                    Скорость {props.speed} зн/мин
                </div>
                <div>
                    Точность {props.accuracy}%
                </div>
            </div>
        </div>
    </div>
}

export default TypingArea
import React from 'react';
import classes from './TypingArea.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';
import restart from '../icons/restart.png';

const TypingArea = (props) => {
    let text = props.outgoingValues + props.incomingValues + 1
    let percent = props.outgoingValues ? ((props.outgoingValues.length * 100) / text.length) : 0
    return (
        <div className={classes.typingArea}>
            <div className={classes.header}>
                <ProgressBar now={percent} variant="success" animated className="w-75"/>
                <img src={restart} alt="restart" width="40" className={classes.restart} onClick={props.onStart}/>
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
                        Скорость 
                        <div>
                            {props.speed} зн/мин
                        </div>
                    </div>
                    
                    <div>
                        Точность
                        <div>
                            {props.accuracy}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingArea
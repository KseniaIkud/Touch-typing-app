import React, { useState } from 'react';
import getText from '../utils/getText';
import getCurrentTime from '../utils/getCurrentTime';
import useKeyPress from '../hooks/useKeyPress';
import Start from './Start';
import TypingArea from './TypingArea';
import Result from './Result';

const App = () => {
    
    const [outgoingValues, setOutgoingValues] = useState('');
    const [incomingValues, setIncomingValues] = useState();
    const [currentSymbol, setCurrentSymbol] = useState();
    const [startTime, setStartTime] = useState();
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [typedText, setTypedText] = useState('');
    const [isWrongSymbol, setWrongSymbol] = useState(false);
    const [showStart, setShowStart] = useState(true);
    const [showResult, setShowResult] = useState (false);
    const [language, setLanguage] = useState('rus');

    let textState = {
        text: outgoingValues + currentSymbol + incomingValues,
        incomingValues, 
        outgoingValues,
        currentSymbol,
        isWrongSymbol
    }
    let resultState = {
        accuracy,
        speed
    }
    let languageState = {
        language,
        setRussian() {
            setLanguage('rus')    
        },
        setEnglish() {
            setLanguage('eng')
        }
    }
    
    const updateState = () => {
        setOutgoingValues('');
        setStartTime();
        setSpeed(0);
        setAccuracy(100);
        setTypedText('');
        setWrongSymbol(false);
    }
    const onStart = () => {
        setShowStart(false);
        setShowResult(false);
        updateState();
        if (language === 'rus') {
            getText.getCyrillicText()
            .then(result => {
                setIncomingValues(result.substr(1));
                setCurrentSymbol(result.charAt(0));
            })
            .catch(err => console.log(err))
        } else if (language === 'eng') {
            getText.getLatinText()
            .then(result => {
                setIncomingValues(result.substr(1));
                setCurrentSymbol(result.charAt(0));
            })
            .catch(err => console.log(err))
        }
    };

    const onKeyPress = (key) => {
        const updateAccuracy = (expected, typed) => {
            setAccuracy(((expected.length * 100) / (typed.length)).toFixed(0,));
        }
        let currentTime = getCurrentTime();
        if (!startTime) {
            setStartTime(currentTime);
        };
        let updatedTypedText = typedText + key;
        let updatedOutgoingValues = outgoingValues;

        if (key === currentSymbol) {
            setTypedText(updatedTypedText);

            updatedOutgoingValues += key;
            setOutgoingValues(updatedOutgoingValues);

            setCurrentSymbol(incomingValues.charAt(0));
            setIncomingValues(incomingValues.substr(1));
            setWrongSymbol(false);
            updateAccuracy(updatedOutgoingValues, updatedTypedText);
            let isFinished = (startTime && !incomingValues)
            if (isFinished) {
                setOutgoingValues('');
                setShowResult(true);
            }
        } else {
            setWrongSymbol(true);
            let isSameMistake = (updatedTypedText.slice(-2, -1) === updatedOutgoingValues.slice(-1))
            if (isSameMistake) {
                setTypedText(updatedTypedText);
                updateAccuracy(updatedOutgoingValues, updatedTypedText);
            }
        }
        if (startTime) {
            const duration = (currentTime - startTime) / 60000;
            const speed = (updatedOutgoingValues.length / duration).toFixed(0,);
            setSpeed(speed);
        }
    }

    useKeyPress(onKeyPress)
    return (
        <div>
           <Start onStart={onStart} show={showStart} language={languageState}/>
           <Result onStart={onStart} show={showResult} result={resultState} language={languageState}/>
           <TypingArea onStart={onStart} result={resultState} text={textState} />
        </div>
    )
}

export default App;

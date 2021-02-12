import {useState, useEffect} from 'react';

const useKeyPress = (callback) => {
    const [keyPressed, setKeyPressed] = useState()
    const downHandler = ({key}) => {
        if (keyPressed !== key && key.length === 1) {
            setKeyPressed(key)
            callback(key)
        }
    }
    const upHandler = () => {
        setKeyPressed(null)
    }
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        }
    })
    return keyPressed
};
export default useKeyPress;
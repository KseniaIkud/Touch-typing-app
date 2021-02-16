const getText = (language) => {
    if (language === 'rus') {
        return fetch('https://fish-text.ru/get?format=json&number=3')
            .then(response => response.json())
            .then(object => object.text)
    }
    if (language === 'eng') {
        return fetch('https://baconipsum.com/api/?type=all-meat&sentences=4')
            .then(response => response.json())
            .then(array => array[0])
    }
}
export default getText

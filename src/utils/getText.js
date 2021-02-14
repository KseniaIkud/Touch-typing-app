const getText = {
    getLatinText() {
        return fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
        .then(response => response.json())
        .then(array => array[0])
    },
    getCyrillicText() {
        return fetch('https://fish-text.ru/get?format=json&number=3')
        .then(response => response.json())
        .then(object => object.text)
    }
}
export default getText

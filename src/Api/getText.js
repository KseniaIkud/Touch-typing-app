const getText = () => {
    return fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1').then(response => {
        return response.json()
    })
}
export default getText
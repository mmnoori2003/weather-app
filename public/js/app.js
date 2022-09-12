
const weatherForm = document.querySelector('form')
const weatherAddress = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?address=${weatherAddress.value}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            }
            else {
                messageOne.textContent = data.location
                messageTwo.innerHTML = data.forecast
            }
        })
})
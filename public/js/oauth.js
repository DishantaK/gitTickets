const submitButton = document.getElementById('submitUser')
const client_id = 'e65135e5a281077fec97';

submitButton.addEventListener('click', function(e){
    e.preventDefault()
    window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`)
})

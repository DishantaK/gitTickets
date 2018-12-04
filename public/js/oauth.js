const submitButton = document.getElementById('submit')
const client_id = 'Iv1.60760d2b9e87f926';

submitButton.addEventListener('click', function(e){
    e.preventDefault()
    window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`)
})
const client_id = 'Iv1.60760d2b9e87f926';

// api call to gitHub to get users data
const getUser = async function(user){
    api_call = await fetch(`https://api.github.com/repos/${user}/gitTickets/issues?state=all&client_id=${client_id}`);
    userData = await api_call.json()
    return{userData}
};

// function that take the api data and displays it for the user
const getUserData = function(){
    getUser('DishantaK').then(function(res){

        for(let i = 0; i < res.userData.length; i++){
            console.log(res.userData[i])
                user = res.userData[i].user.login
                issueId = res.userData[i].id
                issueNum = res.userData[i].number
                issueTitle = res.userData[i].title
                issueBody = res.userData[i].body
                issueState = res.userData[i].state
                issueDate = res.userData[i].created_at
                utcDate = new Date(issueDate).toUTCString()
                monthValue = new Date (utcDate).getMonth()
                monthArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                month = monthArray[monthValue]
                day = new Date (utcDate).getDay()
                year = new Date (utcDate).getFullYear()
                date = `${month} ${day}, ${year}`
                issueLink = res.userData[i].html_url
                $('.container').append(`
                <div class="card mx-auto" id="id:${issueId}">
                <div class="card-body">
                    <h4 class="card-title">${issueTitle}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Date created: ${date}</h6>
                    <div id="icon"></div>
                    <p class="card-text">${issueBody}</p>
                    <div class="row">
                    <div id="link">
                    <a href='${issueLink}'>Issue Link</a>
                    </div>
                    </div>
                        <div class="tags col">
                            <span class="badge badge-primary">${issueState}</span>
                            <span class="badge badge-info">${user}</span>
                            <span class="badge badge-danger">PRIORITY: HIGH</span>
                        </div>
                    </div>
                </div>
            `)
            if(issueState === 'closed'){
                id = document.getElementById(`id:${issueId}`).id
                console.log(id)
                $('#icon').append('<i class="fas fa-check" id="check"></i>')
            }
            }
        })
    }



$(document).ready( function(){
    getUserData()
 });

$('#newItem').on('click', function () {
    $('#myModal').modal(options)
});
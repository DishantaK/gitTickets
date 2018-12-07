const client_id = 'Iv1.60760d2b9e87f926';

// api call to gitHub to get users data
const getUser = async function(user){
    api_call = await fetch(`https://api.github.com/repos/${user}/gitTickets/issues?state=all&client_id=${client_id}`);

    userData = await api_call.json()
    return {
        userData
    }
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


$(document).ready(function () {
    getUserData()
});


//function that saves the modal contents
const saveModal = function (e) {
    e.preventDefault();
    const inputTitle = $('#titleTextarea').val();
    const inputText = $('#commentTextarea').val();
    const data = {
        issueName: inputTitle,
        comments: inputText
    }
    console.log(data, "---- this is the issue")
    $.post('/api/users', data)
        .then(function (resdata) {
            console.log(resdata, "This is the response data");
            render(resdata);

            $('#titleTextarea').val('');
            $('commentTextarea').val('');
        })
}

{
    /* <div class="card mx-auto">
            <div class="card-body">
              <h4 class="card-title" id="title"></h4>
              <h6 class="card-subtitle mb-2 text-muted">
                Date created: Dec. 1, 2018
              </h6>
              <p class="card-text" id="body"></p>
              <div class="row">
                <div id="link"></div>
                <div class="tags col">
                  <span class="badge badge-primary" id="state"></span>
                  <span class="badge badge-info" id="user"></span>
                  <span class="badge badge-danger">PRIORITY: HIGH</span>
                </div>
              </div>
            </div>
          </div> */
}
const render = function (data) {
    console.log('render');
    $(`.center-feed`).prepend(
        `<div class="card mx-auto">
    <div class="card-body">
      <h4 class="card-title" id="title"> ${data.issueName}</h4>
      <h6 class="card-subtitle mb-2 text-muted">
        Date created: ${Date().split(' ').slice(0, 4).join(' ')}
      </h6>
      <p class="card-text" id="body">${data.comments}</p>
      <div class="row">
      <div id="link">${`<a href="https://github.com/DishantaK/gitTickets" class="card-link col">Issue Link</a>`}</div>
      <div class="tags col">
        <span class="badge badge-primary" id="state">OPEN</span>
        <span class="badge badge-info" id="user">USER</span>
        <span class="badge badge-danger">HIGH</span>
      </div>
    </div>
</div>
        </div>
      </div>
    </div>
  </div>`)
}

$('#save').on('click', saveModal);

function getAllModal() {

    $.get('/api/users')
        .then(function (serverData) {
            $(`.center-feed`).empty();
            for (let i = 0; i < serverData.length; i++) {
                render(serverData[i]);
            }
        })

}

getAllModal();
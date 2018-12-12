
const client_id = 'e65135e5a281077fec97';

// api call to gitHub to get repo issue data
const getUser = async function(userName){
    api_call = await fetch(`https://api.github.com/repos/DishantaK/sheBlogs/issues?state=all&client_id=${client_id}&creator=${userName}`);
    userData = await api_call.json()
    return{userData}
};

// function that take the api data and displays it for the user
const getUserData = function(){
    var userName = sessionStorage.getItem('user')
    let centerfeed;
    getUser(userName).then(function(res){
        for(let i = 0; i < res.userData.length; i++){
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
                day = new Date (utcDate).getDate()
                year = new Date (utcDate).getFullYear()
                date = `${month} ${day}, ${year}`
                issueLink = res.userData[i].html_url
                centerfeed += `
                <div class="card mx-auto" id="id:${issueId}">
                <div class="card-body">
                    <h4 class="card-title">${issueTitle}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Date created: ${date}</h6>`;
                if(issueState === 'closed'){
                    centerfeed += '<div id="icon"><i class="fas fa-check" id="check"></i></div>';
                }      
                centerfeed += `<p class="card-text">${issueBody}</p>
                    <div class="row">
                    <div id="link">
                    <a href='${issueLink}' target ="blank" >Issue Link</a>
                    </div>
                    </div>
                        <div class="tags col">
                            <span class="badge badge-primary">${issueState}</span>
                            <span class="badge badge-info">${user}</span>
                        </div>
                    </div>
                </div>`
        }    $('.center-feed').append(centerfeed);
    })
}

$(document).ready(function () {
    user()
    token()
});

// function that get GitHub username
function user(){
$.get('/user', function(data){
    sessionStorage.setItem('user', data.login) 
    getUserData()
})
}

// function that get GitHub access token
function token(){
    $.get("/token", function(data) {
        let token = data;
        sessionStorage.setItem('token', token)
     });
}

// function to create issues on GitHub 
function createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken) {
    var url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
    $.ajax({
      url: url,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'token ' + accessToken);
      },
      data: JSON.stringify({
        title: issueTitle, 
        body: issueBody
      })
    }).then(function(){
        getUserData()
        location.reload()
    })
  }

    $('#save').on('click', function(event){
      var repoName = 'sheBlogs'
      var repoOwner = 'DishantaK'
      var issueTitle = $('#titleTextarea').val();
      var issueBody = $('#commentTextarea').val();
      var accessToken = sessionStorage.getItem('token')
      createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken);
      event.preventDefault();
    });


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
        <span class="badge badge-info" id="user">${usericon}</span>
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

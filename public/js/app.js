const client_id = 'e65135e5a281077fec97';
const client_secret = '68e34c43178054e42b1867ee1257b37d13c85892';

// api call to gitHub to get users data
const getUser = async function(){
    api_call = await fetch(`https://api.github.com/repos/DishantaK/sheBlogs/issues?state=all&client_id=${client_id}`);
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
            console.log(issueState)
            if(issueState === 'closed'){
                $('#icon').append('<i class="fas fa-check" id="check"></i>')
            }
        }
    })
}

$(document).ready(function () {
    getUserData()
});

function createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken) {
    var url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
    $.ajax({
      url: url,
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'token' + accessToken);
      },
      data: JSON.stringify({
        title: issueTitle, 
        body: issueBody
      })
    }).done(handleResponse)
    console.log(issueTitle, issueBody)
    console.log(data)
    .fail(handleError);
  }

  function handleSubmit() {
    $('#save').on('click', function(event){
      var repoName = 'sheBlogs'
      var repoOwner = 'DishantaK'
      var issueTitle = $('#titleTextarea').val();
      var issueBody = $('#commentTextarea').val();
      var accessToken = '0a5477682ce19f1da9b735c469fb1f09f1dfe231'
      createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken);
      event.preventDefault();
    });
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
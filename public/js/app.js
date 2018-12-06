const userName = document.getElementById('inputUsername')
const issues = document.getElementById('data')
const client_id = 'Iv1.60760d2b9e87f926';
const client_secret = '5159f5c2bc3db0d29718cea17281df1b9646ad16';

// api call to gitHub to get users data
const getUser = async function (user) {
    api_call = await fetch(`https://api.github.com/users/${user}/events?client_id=${client_id}&client_secret=${client_secret}`);
    userData = await api_call.json()
    return {
        userData
    }
};

// function that take the api data and displays it for the user
const getUserData = function () {
    getUser('MarcusRobinson928').then(function (res) {
        // if(userName.value === ''){
        //     alert("Must Enter Username")
        // }

        for (let i = 0; i < res.userData.length; i++) {
            if (res.userData[i].type === 'IssuesEvent') {
                user = res.userData[i].payload.issue.user.login
                repoName = res.userData[i].repo.name
                issueNum = res.userData[i].payload.issue.number
                issueTitle = res.userData[i].payload.issue.title
                issueBody = res.userData[i].payload.issue.body
                issueState = res.userData[i].payload.issue.state
                issueDate = res.userData[i].payload.issue.created_at
                issueLink = res.userData[i].payload.issue.html_url
                console.log(user)
                $('#user').html('User:' + user)
                console.log(repoName)
                console.log(issueNum)
                console.log(issueTitle)
                $('.card-title').html(issueTitle)
                console.log(issueBody)
                $('#body').html(issueBody)
                console.log(issueState)
                $('#state').html('Status:' + issueState)
                console.log(issueDate)
                console.log(issueLink)
                $('#link').html('<a href="' + issueLink + '" class="card-link col">Issue Link</a>');
            }
        }
    })
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
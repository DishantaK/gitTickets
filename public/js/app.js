const userName = document.getElementById('inputUsername')
const issues = document.getElementById('data')
const client_id = 'Iv1.60760d2b9e87f926';
const client_secret = '5159f5c2bc3db0d29718cea17281df1b9646ad16';

// api call to gitHub to get users data
const getUser = async function(user){
    api_call = await fetch(`https://api.github.com/users/${user}/events?client_id=${client_id}&client_secret=${client_secret}`);
    userData = await api_call.json()
    return{userData}
};

// function that take the api data and displays it for the user
const getUserData = function(){
    getUser('MarcusRobinson928').then(function(res){
        // if(userName.value === ''){
        //     alert("Must Enter Username")
        // }

        for(let i = 0; i < res.userData.length; i++){
            if(res.userData[i].type === 'IssuesEvent'){ 
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

$(document).ready( function(){
    getUserData()
 });

$('#newItem').on('click', function () {
    $('#myModal').modal('toggle')
});
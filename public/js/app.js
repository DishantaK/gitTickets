const userName = document.getElementById('inputUsername')
const submitButton = document.getElementById('submit')
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
    getUser(userName.value).then(function(res){
        if(userName.value === ''){
            alert("Must Enter Username")
        }

        for(let i = 0; i < res.userData.length; i++){
            if(res.userData[i].payload.issue.user.login === userName.value){ 
                repoName = res.userData[i].repo.name
                issueNum = res.userData[i].payload.issue.number
                issueTitle = res.userData[i].payload.issue.title
                issueState = res.userData[i].payload.issue.state
                issueDate = res.userData[i].payload.issue.created_at
                console.log(repoName)
                console.log(issueNum)
                console.log(issueTitle)
                console.log(issueState)
                console.log(issueDate)
                }
            }
        })
    }

submitButton.addEventListener('click', function(e){
    e.preventDefault()
    getUserData()
})

$('#newItem').on('click', function () {
    $('#myModal').modal('toggle')
});
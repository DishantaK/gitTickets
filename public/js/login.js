
$('#submitUser').on('click', function (event) {
    event.preventDefault();
    const userLogin = {
        email: $('#inputEmail1').val().trim(),
        username: $('#inputUsername').val().trim(),
        password: $('#inputPassword1').val().trim(),
        passwordConf: $('#inputPassword2').val().trim(),

    };
    console.log(userLogin)

    for (let key in userLogin) {
        if (userLogin[key] === '') {
            alert('Username or Password not valid!');
            return;
        }
    }

    if (userLogin.password !== userLogin.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        console.log(err)
        return (err)
    }

    else {
        $.ajax({
            url: '/api/user',
            method: 'POST',
            data: userLogin
        }).then(
            function (data) {
                if (data.success === false) {
                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
                else {
                  
                    localStorage.setItem('username', userLogin.username)
                    localStorage.setItem('password', userLogin.password)
                    window.location.href = '/gittix';
                }

            })

        const userProfile = function () {
            $('.fa-user-astronaut').on('click', function (event) {
                $('.modal-body>').text(`${userLogin.email}`);
                email = this.email
                user = this.username
                password = this.password
            })
        };
        userProfile()
    }

    // const existingUserLogin = function () {

    //     $.ajax({ url: "/api/user", method: "GET" })
    //         .then(function () {
    //             res.redirect(window.location.replace('/gittix'))
    //         });
    // }
})

$('#submitExistingUser').on('click', function (event) {
    event.preventDefault();
    const userLogin = {
        username: $('#inputUsername').val().trim(),
        password: $('#inputPassword1').val().trim(),
    };

    for (let key in userLogin) {
        if (userLogin[key] === '') {
            alert('Username or Password not valid!');
            return;
        }
    }
    $.ajax({
        url: '/api/user',
        method: 'GET',
        data: userLogin
    }).then(
        function (data) {
            if (data.success === false) {
                alert('There was a problem with your submission. Please check your entry and try again.');
            }
            else {
                existingUser = localStorage.setItem('username', userLogin.username)
                existingPassword = localStorage.setItem('password', userLogin.password)
                window.location.href = '/gittix'
            }
        });
})

$('#user-info').on('click', function (event) {
    $("#changePass").prop('disabled', false)
    let renderUser = localStorage.getItem('username')
    let renderPass = localStorage.getItem('password')
    console.log('im here')
    let hiddenPass = "*".repeat(renderPass.length)
    $('#modaluser').text(renderUser);
    $('#modalbody').text(hiddenPass);
    $( "#changePassbtn" ).remove();
    localStorage.getItem('password')
})


    $('#changePass').on('click', function(){
       $(this).prop('disabled', true);
        $('#changePass-one').append('<input class = "form-control" id = "newPassChange" placeholder="New Password"/>')
        $('#changePass-two').append('<input class = "form-control" id = "confirmPassChange" placeholder ="Confirm New Password"/>')
        $('#changePassword').append('<button id = "changePassbtn" onclick="passChangebox()"type = "button" class="btn btn-primary btnhide" data-dismiss="modal">Submit</button>')
        $(".btnhide").removeClass('hide')
       
    })
    
   const passChangebox = function(){
        $( "#newPassChange" ).remove();
        $( "#confirmPassChange" ).remove();
        
   }

    $('body').on('click', '#changePassbtn', function(){
        const chngPass = {
            username: localStorage.getItem('username'),
            password: $('#newPassChange').val().trim(),
            passwordConf: $('#confirmPassChange').val().trim()
        };
        console.log(chngPass)
        if (chngPass.password !== chngPass.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            console.log(err)
            return (err)
        }
        else {
            $.ajax({
                url: '/api/user',
                method: 'PUT',
                data: chngPass
            }).then(function(newPass){ 
                if(newPass === null){
                    var err = new Error('Passwords do not match.');
                    err.status = 400;
                    console.log(err)
                    return (err)
                }else{
                    localStorage.setItem('password', chngPass.password)
                    window.location.reload(); 
                }
            })
        }
    })

$('#log-out').on('click', function(event){
    localStorage.clear()
    window.location.href = '/login'
})

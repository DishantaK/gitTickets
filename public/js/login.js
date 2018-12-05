
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

        if ( userLogin.password !== userLogin.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            console.log(err)
            return (err)}

            else   {
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
                            window.location.href = '/gittix'
                        }
                    });
            }   

            const existingUserLogin = function () {

                $.ajax({ url: "/api/user", method: "GET" })
                    .then(function () {
                        res.redirect(window.location.replace('/gittix'))
                    });
            }
    })
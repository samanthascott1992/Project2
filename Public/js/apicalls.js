$(document).ready(function(){

    var userName = $("#inputName").val().trim()(/\s+/g);
    var email = $("#inputEmail").val().trim();
    var password = $("#inputPassword").val().trim();
    var address = `${$("#inputAddress").val().trim} ${$("#inputCity").val().trim()}, ${$("#inputState")} ${$("#inputZip")}`;

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

    function signUpUser(userName, email, password, address) {
        $.post("/api/signup", {
            name: userName,
            email: email,
            password: password,
            address: address
        })
            .then(function(data) {
                window.location.replace("/login");
            })
            .catch(handleLoginErr);
    }

    $("#create-user").on("click", event=>{
        event.preventDefault();

        const userData = {
            name: userName,
            email: email,
            hashedPassword: password,
            address: address
        };

        if (!userData.name || !userData.email || !userData.password || !userData.address) {
            return;
        }

        signUpUser(userData.name, userData.email, userData.password);
        $("#inputName").val("");
        $("#inputEmail").val("");
        $("#inputPassword").val("");
        $("#inputAddress").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputZip").val("");
    });



});
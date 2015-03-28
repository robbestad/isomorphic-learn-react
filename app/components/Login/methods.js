//
//weight(access_token) {
//    //console.log(access_token);
//    $.ajax({
//        url: "http://api-robbestad.dev/slankapi/vekt/111/60",
//        type: 'GET',
//        data: {
//            "access_token": access_token,
//            "client_id": "testclient",
//            "client_secret": "testpass"
//        },
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader('Accept', "application/json");
//        }
//    })
//        .success(function (data) {
//            //console.log(data);
//        })
//        .fail(function (err) {
//            console.log(err.responseText);
//        });
//},


//
//if (payload.actionType === "GET_WEIGHT") {
//    $.ajax({
//        url: "http://api-robbestad.dev/slankapi/vekt/111/60",
//        type: 'GET',
//        data: {
//            "access_token": access_token,
//            "refresh_token": refresh_token,
//            "client_id": "testclient",
//            "client_secret": "testpass"
//        },
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader('Accept', "application/json");
//        }
//    })
//        .success(function (data) {
//            setLoggedIn();
//            LoginStore.emitChange();
//        })
//        .fail(function (err) {
//            console.log(err.responseText);
//        });
//}

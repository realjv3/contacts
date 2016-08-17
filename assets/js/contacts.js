/**
 * Created by John on 8/13/2016.
 */

function showSection(event) {
    event.preventDefault();

    switch(event.currentTarget.id) {
        case 'contacts_link':
            document.getElementById('contacts').style.display = 'block';
            document.getElementById('fb_contacts').style.display = 'none';
            document.getElementById('google_contacts').style.display = 'none';
            showFb();
            break;
        case 'fb_link':
            document.getElementById('fb_contacts').style.display = 'block';
            document.getElementById('fb_contacts').style.backgroundImage = 'url("https://googledrive.com/host/0B1f8PNGaySaRYjgwSE9pUGF2TnM")';
            document.getElementById('contacts').style.display = 'none';
            document.getElementById('google_contacts').style.display = 'none';
            showFb();
            break;
        case 'google_link':
            document.getElementById('google_contacts').style.display = 'block';
            document.getElementById('google_contacts').style.backgroundImage = 'url("https://googledrive.com/host/0B1f8PNGaySaRYjgwSE9pUGF2TnM")';
            document.getElementById('contacts').style.display = 'none';
            document.getElementById('fb_contacts').style.display = 'none';
            gapi.load("client", showGoogle);
            break;
    }
}

document.getElementById('contacts_link').addEventListener('click', showSection);
document.getElementById('fb_link').addEventListener('click', showSection);
document.getElementById('google_link').addEventListener('click', showSection);
showUsers();

function addUser() {
    var formdata = document.forms['add_user'].elements;
    // Validate
    if(formdata[0].value == '' || formdata[0].value == undefined) {
        document.getElementById('first').className += ' has-error';
        return;
    } else {
        var fields = document.getElementsByClassName('label-floating');
        for(var i = 0; i < fields.length; i++) {
            fields[i].className += ' has-success';
        }
    }
    // Add to database
    var id = localStorage.length;
    localStorage.setItem(
        'contact'+id+'',
        JSON.stringify({
            id: id,
            first: (formdata[0].value) ? formdata[0].value : '',
            last: (formdata[1].value) ? formdata[1].value : '',
            phone: (formdata[2].value) ? formdata[2].value : '',
            email: (formdata[3].value) ? formdata[3].value : '',
        })
    );
    document.forms['add_user'].reset();
    for(var i = 0; i < fields.length; i++) {
        fields[i].className += 'form-group label-floating col-sm-6';
    }
    showUsers();
}

function showUsers() {
    var ul = document.getElementById('contacts_ul');
    ul.innerHTML = '';
    if (localStorage.length)
        for(var row in localStorage) {
            var contact = JSON.parse(localStorage.getItem(row));
            ul.innerHTML += '<li class="contact list-group-item col-sm-12"><button type="button" class="btn btn-danger btn-fab btn-fab-mini btn-round" id="contact'+contact.id+'"><i class="fa fa-user-times" aria-hidden="true" style="margin-left: 7px"></i></button><i class="fa fa-user"></i><p>'+contact.first+' '+ contact.last +'</p><span>'+ contact.phone +' '+ contact.email +'</span></li>';
        }
    var delBtns = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < delBtns.length; i++)
        delBtns[i].addEventListener('click', delUser);
}

function delUser(event) {
    localStorage.removeItem(event.currentTarget.id);
    showUsers();
}

function showFb() {
    FB.getLoginStatus(function(resp) {
        if(resp.status != 'connected') {
            FB.login(function(resp) {
                if(resp.authResponse)
                    outputFbFriends();
            }, {scope: 'user_friends'});
        }
        else
            outputFbFriends();
    });
}

function outputFbFriends() {
    var list = document.getElementById('fb_contacts_ul');
    var theresMore  = undefined;
    list.innerHTML = '';
    FB.api('/me/friends?fields=picture,name', function(resp) {
        if(!resp.data.length) {
            list.innerHTML = '<p>None of your facebook friends use this app.</p>';
            return;
        }
        for(var i = 0; i < resp.data.length; i++) {
            var contact = '';
            contact = '<li class="contact list-group-item"><img src="'+resp.data[i].picture.data.url+'"><p>'+resp.data[i].name+'</p></li>';
            list.innerHTML += contact;
        }
        if(resp.paging.next != undefined)
            theresMore = resp.paging.next;
        while (theresMore != undefined) {
            $.ajax({url: theresMore, async: false, success: function(response) {
                for(var i = 0; i < response.data.length; i++) {
                    var contact = '';
                    contact = '<li class="contact list-group-item"><img src="'+response.data[i].picture.data.url+'"><p>'+response.data[i].name+'</p></li>';
                    list.innerHTML += contact;
                }
                if(response.paging.next)
                    theresMore = response.paging.next;
                else
                    theresMore = undefined;
            }});
        }
        document.getElementById('fb_contacts').style.backgroundImage = '';
    });
}

function showGoogle() {
    gapi.client.setApiKey('AIzaSyCFDOsV1_qqkfk1yLgTfyxcVtAIVGhz7_E');
    gapi.auth.authorize({client_id: '601279760047-e2ioc5l0vcpoiu008ksh7o0470s26p1c.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly', immediate: true}, handleGoogleAuth);
}

function handleGoogleAuth(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error)
        gapi.client.load('https://people.googleapis.com/$discovery/rest', 'v1', outputGoogleContacts);
}

function outputGoogleContacts() {
    var request = gapi.client.people.people.connections.list({resourceName: 'people/me', pageSize: 500});
    request.execute(function(resp) {
        console.log(resp);
        document.getElementById('google_contacts').style.backgroundImage = '';
        var list = document.getElementById('google_contacts_ul');
        if(resp.error) {
            if(resp.error.code == 429) {
                list.innerHTML = '<span>'+ resp.error.message +'</span><br>';
                list.innerHTML += '<i class="fa fa-exclamation-circle" aria-hidden="true"></i><h3>Basically, we ran out of Google People api quota. Please wait like a minute or so.</h3>';
                return;
            } else
            list.innerHTML = '';
        }
        for(var i = 0; i < 25; i++) { //Only outputting 25 or so contacts because I don't want to buy more quota
            var request = gapi.client.people.people.get({resourceName: resp.connections[i].resourceName});
            request.execute(function(resp) {
                var contact = '<li class="contact list-group-item"><i class="fa fa-user"></i><span>'+resp.names[0].displayName+'</span><br><span><i class="icon-envelope"></i>'+resp.emailAddresses[0].value+'</span></li>';
                list.innerHTML += contact;
            });
        }
    })
}

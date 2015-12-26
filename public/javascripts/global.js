// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});

// Functions =============================================================

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function insertData(data) {
    var tableContent = '';
    userListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
        tableContent += '<tr>';
        tableContent += '<td>' + (this.rank) + '.</td>'
        if(this.bold) {
            tableContent += '<td><b>' + this.rpname + '</b></a></td>';
        } else { 
            tableContent += '<td>' + this.rpname + '</a></td>';
        }
        
        tableContent += '<td>$' + Math.floor(this.wallet) + '</td>';
        tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
}

// Fill table with data
function populateTable() {

    var page = getParameterByName('page');
    var steamid = getParameterByName('steamid');

    if(0 !== steamid.length){
        $('#back').prop("href", "/");
        $('#back').text("Return");
        $('#next').remove();
    } else if( 1 == page || 0 == page || 0 === page.length) {
        $('#back').remove();
        $('#next').prop ("href", "/?page=2");
    } else {
        $('#back').prop("href", "/?page=" + (parseInt(page) - 1));
        $('#next').prop("href", "/?page=" + (parseInt(page) + 1));
    }

    $.getJSON('/users/userlist?p=' + (page || 1) +'&s=' + (steamid), insertData);
    
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.username;
    }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};
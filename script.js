// would like to add "mature" functionality
// would like to sort list items by alphabet or by who was most recently active

var users = [
  "FreeCodeCamp",
  "wintergaming",
  "summit1g",
  "ChessNetwork",
  "fl0m",
  "Polt",
  "x5_PiG",
  "ESL_SC2",
  "comster404",
  "MisterRogers"
];

// online
var streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";
// offline
var channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";
// url ending
var callbackURL = "?callback=?";

// default to "all" on page load
$("#onlineList, #offlineList").hide();

// "all", "online", and "offline" button functionality
$("#allBtn").on("click", function() {
  $("#onlineList, #offlineList").hide();
  $("#userList").show();
});
$("#onlineBtn").on("click", function() {
  $("#userList, #offlineList").hide();
  $("#onlineList").show();
});
$("#offlineBtn").on("click", function() {
  $("#onlineList, #userList").hide();
  $("#offlineList").show();
});

//var names = [];
  function twitchStreamers(username) {
    $.getJSON(streamsURL + username + callbackURL, function(status) {
      // if online
      if (status.stream && status.error !== true) {
        var onlineLogo = status.stream.channel.logo;
        var onlineName = status.stream.channel.display_name;
        var onlineURL = status.stream.channel.url;
        var onlineGame = status.stream.channel.game;
        var onlineFollowers = status.stream.channel.followers;
        var onlineStatus = status.stream.channel.status;
        var views = status.stream.viewers;
        
        // fills list items with online info
        $("#userList, #onlineList").append(
          '<li class="user online"><div class="userHeader onlineUserHeader"><span class="logo onlineLogo"><img src="' +
            onlineLogo +
            '"></span><span class="name onlineName" title="' +
            onlineName +
            '"><a href="' +
            onlineURL +
            '">' +
            onlineName +
            '</a></span><span class="bubble onlineBubble"></span></div><div class="userBody onlineUserBody"><div class="info onlineInfo"><strong>Views: </strong>' +
            views +
            "&nbsp; &bull; &nbsp;<strong>Followers: </strong>" +
            onlineFollowers +
            '</div><div class="game onlineGame"><p><strong>' +
            onlineGame +
            ":</strong> <em>" +
            onlineStatus +
            "</em></p></div></div></li>"
        );
        
        // online status bubble
        $(".bubble").html(
          '<i class="fa fa-circle fa-lg" aria-hidden="true"></i><span class="sr-only">Online</span>'
        );
      } else {
        // if offline
        $.getJSON(channelsURL + username + callbackURL, function(offline) {
          var offlineLogo = offline.logo;
          var offlineName = offline.display_name;
          var offlineURL = offline.url;
          var offlineGame = offline.game;
          var offlineFollowers = offline.followers;
          var offlineMature = offline.mature;
          var offlineStatus = offline.status;
          var lastUpdated = offline.updated_at;

          // if user LOGO does not exist
          if (offlineLogo === undefined || offlineLogo === null) {
            // default logo
            offlineLogo =
              "https://www.jainsusa.com/images/store/landscape/not-available.jpg";
          }
          
          // if USER does not exist
          if (offlineName === undefined) {
            offlineName = username;
            // fills list items with error info
            $("#userList, #offlineList").append(
              '<li class="user error"><div class="userHeader errorUserHeader"><span class="logo errorLogo"><img src="' +
                offlineLogo +
                '"></span><span class="name errorName" title="' +
                offlineName +
                '">' +
                offlineName +
                '</span><span class="bubble errorBubble"></span></div><div class="userBody errorUserBody"><div class="errorStatus"><p><strong>User does not exist.</strong></p></div></div></li>'
            );

            // error status bubble
            $(".bubble").html(
              '<i class="fa fa-circle fa-lg" aria-hidden="true"></i><span class="sr-only">Error</span>'
            );
          } else {
            // if user offline AND exists
            // fills list items with offline info
            $("#userList, #offlineList").append(
              '<li class="user offline"><div class="userHeader offlineUserHeader"><span class="logo offlineLogo"><img src="' +
                offlineLogo +
                '"></span><span class="name offlineName" title="' +
                offlineName +
                '"><a href="' +
                offlineURL +
                '">' +
                offlineName +
                '</a></span><span class="bubble offlineBubble"></span></div><div class="userBody offlineUserBody"><div class="info offlineInfo"><strong>Followers: </strong>' +
                offlineFollowers +
                '</div><div class="game offlineGame"><p><strong>' +
                offlineGame +
                ":</strong> <em>" +
                offlineStatus +
                "</em></p></div></div></li>"
            );

            // offline status bubble
            $(".bubble")
              .html("")
              .html(
                '<i class="fa fa-circle fa-lg" aria-hidden="true"></i><span class="sr-only">Offline</span>'
              );
          }
        });
      }
    });
  }

$(document).ready(function() {
  // loop through array
  $.each(users, function(i, val) {
    // output function
    twitchStreamers(val);
  });
});

window.fbAsyncInit = function() {
  FB.init({
    appId: '742372512461807',
    channelUrl: 'http://thinkhouse.ie/playground/gcharts/facebook/insights/',
    status: true,
    cookie: true,
    xfbml: true
  });
  FB.login(function() {}, {
    scope: 'publish_actions'
  });

  // User Login
  Login = function() {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log(response);
        getUserInfo();
        // Get user access token
        accessToken = response.authResponse.accessToken;
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'email,user_photos,user_videos'
    });
    $('#login').hide();
    $('#wrapper').fadeIn(300);
  }

  // Show username
  getUserInfo = function() {
    FB.api('/me', function(response) {
      userID = response.id;
      var str = '<div id="name">User : ' + response.name + '</div>';
      str += '<div id="user-id">' + response.id + '</div>';
      document.getElementById("user").innerHTML = str;
      // Get page access token
      result = '';
      pageAT = '';
      pages = [];
      fbUrl = 'https://graph.facebook.com/me';
      url = fbUrl + '/accounts?access_token=' + 'CAACEdEose0cBACwkE4811YLjsY8Si3b88HdwLgu8ZBy3sckjiBMlwV95WKs3pLInkGGExBbfOpbMWcjz3ZCJytUAy9wPZC8s3zBsf9jEc5v0P4DWUzA8gcPSB0q0wORZCnxSjgJ0ROwNZCjZCiNS3YY4N6SzrvJMUYK6ZAZAxnYvljJcWv8MrEHcCyMx0Cl2StoZD';
      console.log(url);
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        data: '',
        dataType: 'json',
        success: function(response) {
          result = response;
        }
      })
      // Assign managed pages and their access tokens to the pages array
      for(i=0, len=result.data.length; i<len; i++){
        pages.push({pageName: result.data[i].name, access_token: result.data[i].access_token});
      }
    });
  }

  getPageInfo = function() {
    var account = '/' + pageID;
    console.log(account);
    FB.api(account, function(response) {
      id = response.id;
      if (pageID != 'undefined') {
        var str = '<div id="name"><p>Profile : ' + response.name + '</p>';
      }
      str += '<p id="id">id: ' + response.id + '</p>';
      str += '<input id="getPosts" class="button" type="button" value="Get Posts">';
      str += '<input id="logOut" class="button" type="button" value="Logout">';
      document.getElementById("user").innerHTML = str;
    });
  }

  getPosts = function() {
    console.log(accessToken);
    var query = +pageID + '/insights/?method=GET&format=json&suppress_http_code=1&access_token=' + accessToken;
    console.log(query);
    document.getElementById("feed").innerHTML = '';
    FB.api(query, function(response1) {
      console.log(response1);
      var divContainer = $('#feed');
      var str = '';
      for (i = 0; i < response1.data.length; i++) {
        if (response1.data[i].status_type == 'shared_story') {
          if (response1.data[i].name) {
            str += '<p class="post">' + response1.data[i].name + '</p>';
          }
          if (response1.data[i].likes) {
            str += '<p class="like">' + response1.data[i].likes.data.length + '</p>';
          }
          if (!response1.data[i].likes) {
            str += '<p class="like">0</p>';
          }
          document.getElementById("feed").innerHTML = str;
        }
        if (response1.data[i].status_type == 'added_photos') {
          if (response1.data[i].message) {
            str += '<p class="post">' + response1.data[i].message + '</p>';
          }
          if (response1.data[i].likes) {
            str += '<p class="like">' + response1.data[i].likes.data.length + '</p>';
          }
          if (!response1.data[i].likes) {
            str += '<p class="like">0</p>';
          }
          document.getElementById("feed").innerHTML = str;
        }
      }
    });
  }

  Logout = function() {
    FB.logout(function() {
      document.location.reload();
    });
  }

  // Get Facebook page id
  data = '';
  pageID = '';
  $(document).ready(function() {
    $('#submit').on('click', function() {
      fbUrl = 'https://graph.facebook.com/';
      pageName = $('#input').val();
      accessToken = '';
      console.log(pages);
      for(i=0, len=pages.length; i<len; i++){
        if(pageName == pages[i].pageName){
          accessToken = pages[i].access_token;
        } else {
          console.log('page does not exist, please enter again');
        }
      }
      insight = '/insights/?method=GET&format=json&suppress_http_code=1&access_token=';
      url = fbUrl + pageName + insight + accessToken;
      console.log(url);
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        data: '',
        dataType: 'json',
        success: function(response) {
          data = response;
        }
      })
      console.log(data);
    })
  })

  $(document).ready(function() {
    if ($('#id')) {
      getPageInfo();
    }
  })

  // Logout event
  $(document).ready(function() {
    $(document).on('click', '#logOut', function() {
      Logout();
      $('#wrapper').fadeOut(300);
      $('#login').fadeIn(300);
    })
  })

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
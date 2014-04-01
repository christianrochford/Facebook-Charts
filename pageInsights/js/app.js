window.fbAsyncInit = function() {
  FB.init({
    appId: '742372512461807',
    channelUrl: 'http://thinkhouse.ie/playground/gcharts/facebook/insights/',
    status: true,
    cookie: true,
    xfbml: true
  });
  FB.login(function() {}, {
    scope: 'manage_pages,read_insights'
  });

  // User Login
  Login = function() {
    FB.login(function(response) {
      if (response.authResponse) {
        getUserInfo();
        // Get user access token
        userAccessToken = response.authResponse.accessToken;
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'manage_pages,read_insights'
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
      fbUrl = 'https://graph.facebook.com/';
      url = fbUrl + userID +'/accounts?access_token=' + userAccessToken;
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
      console.log(result);
      for(i=0, len=result.data.length; i<len; i++){
        pages.push({pageName: result.data[i].name, access_token: result.data[i].access_token, pageID: result.data[i].id});
      }
      console.log(pages);
    });
  }

  Logout = function() {
    FB.logout(function() {
      document.location.reload();
    });
  }

  // Get Facebook page insights
  data = '';
  $(document).ready(function() {
    $('#submit').on('click', function() {
      fbUrl = 'https://graph.facebook.com/';
      pageName = $('#input').val();
      pageID = '';
      accessToken = '';
      console.log(pages);
      // Check if input value exists in pages array, if so assign pageID and accessToken
      for(i=0, len=pages.length; i<len; i++){
        if(pageName == pages[i].pageName){
          accessToken = pages[i].access_token;
          pageID = pages[i].pageID;
        } else {
          console.log('page does not exist, please enter again');
        }
      }
      // Should not declare client secret on client side. Move to server side!!!!
      getPermToken = 'https://graph.facebook.com/oauth/access_token?client_id=742372512461807&client_secret=46ec273f59ca4891c8ece95e2bec105e&grant_type=fb_exchange_token&fb_exchange_token=' + userAccessToken;
      $.ajax({
        async: false,
        url: getPermToken,
        type: 'GET',
        data: '',
        success: function(response) {
          permToken = response;
        }
      })
      insight = '/insights/?method=GET&format=json&suppress_http_code=1&';
      // Build url based on data obtained from pages array
      url = fbUrl + pageID + insight + permToken;
      console.log(url);
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        data: '',
        success: function(response) {
          data = response;
        }
      })
      console.log(data);
    })
  })

  // Logout event
  $(document).ready(function() {
    $('#logOut').on('click', function() {
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
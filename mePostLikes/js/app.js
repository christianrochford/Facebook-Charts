window.fbAsyncInit = function() {

  FB.init({
    appId: '742372512461807', // Set YOUR APP ID
    channelUrl: 'http://thinkhouse.ie/playground/gcharts/facebook/insights/', // Channel File
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      // document.getElementById("message").innerHTML += "<br>Connected to Facebook";
      //SUCCESS
    } else if (response.status === 'not_authorized') {
      document.getElementById("message").innerHTML += "<br>Failed to Connect";
      //FAILED
    } else {
      document.getElementById("message").innerHTML += "<br>Logged Out";
      //UNKNOWN ERROR
    }
  });

};

function Login() {

  FB.login(function(response) {
    if (response.authResponse) {
      getUserInfo();
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'email,user_photos,user_videos'
  });
  $('#labels').fadeIn(500);
  $('#dashboard').fadeIn(500);
}

function getUserInfo() {
  FB.api('/me', function(response) {
    id = response.id;
    var str = '<div id="name"><p>Profile : ' + response.name + '</p>';
    str += '<p id="id">id: ' + response.id + '</p>';
    getPhoto();
    str += '<input id="getPosts" class="button" type="button" value="Get Posts">';
    str += '<input id="getChart" class="button" type="button" value="Create Chart">';
    str += '<input id="logOut" class="button" type="button" value="Logout">';
    document.getElementById("status").innerHTML = str;
  });
}

function getPhoto() {
  FB.api('/me/picture?type=normal', function(response) {
    var str = "<img src='" + response.data.url + "'></div>";
    document.getElementById("status").innerHTML += str;
  });

}

function getPosts() {
  // create a deferred object
  var r = $.Deferred();
  var query = '/' + id + '/feed';
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
    }
    if (response1.paging.next) {
      var quoted = response1.paging.next;
      var unquoted = quoted.replace(/['"]+/g, '');
      var url = unquoted.replace('https://graph.facebook.com', '')
      FB.api(url, function(response2) {
        console.log(response2);
        var divContainer = $('#feed');
        for (i = 0; i < 10; i++) {
          if (response2.data[i] && response2.data[i].status_type && response2.data[i].status_type == 'shared_story') {
            if (response2.data[i].name) {
              str += '<p class="post">' + response2.data[i].name + '</p>';
            }
            if (response2.data[i].likes) {
              str += '<p class="like">' + response2.data[i].likes.data.length + '</p>';
            }
            if (!response2.data[i].likes) {
              str += '<p class="like">0</p>';
            }
            document.getElementById("feed").innerHTML = str;
          }
        }
        if (response2.paging.next) {
          var quoted = response2.paging.next;
          var unquoted = quoted.replace(/['"]+/g, '');
          var url = unquoted.replace('https://graph.facebook.com', '')
          FB.api(url, function(response3) {
            console.log(response3);
            var divContainer = $('#feed');
            for (i = 0; i < 10; i++) {
              if (response3.data[i] && response3.data[i].status_type && response3.data[i].status_type == 'shared_story') {
                if (response3.data[i].name) {
                  str += '<p class="post">' + response3.data[i].name + '</p>';
                }
                if (response3.data[i].likes) {
                  str += '<p class="like">' + response3.data[i].likes.data.length + '</p>';
                }
                if (!response3.data[i].likes) {
                  str += '<p class="like">0</p>';
                }
                document.getElementById("feed").innerHTML = str;
              }
            }
            if (response3.paging.next) {
              var quoted = response3.paging.next;
              var unquoted = quoted.replace(/['"]+/g, '');
              var url = unquoted.replace('https://graph.facebook.com', '')
              FB.api(url, function(response4) {
                console.log(response4);
                var divContainer = $('#feed');
                for (i = 0; i < 10; i++) {
                  if (response4.data[i] && response4.data[i].status_type && response4.data[i].status_type == 'shared_story') {
                    if (response4.data[i].name) {
                      str += '<p class="post">' + response4.data[i].name + '</p>';
                    }
                    if (response4.data[i].likes) {
                      str += '<p class="like">' + response4.data[i].likes.data.length + '</p>';
                    }
                    if (!response4.data[i].likes) {
                      str += '<p class="like">0</p>';
                    }
                    document.getElementById("feed").innerHTML = str;
                  }
                }
                if (response4.paging.next) {
                  var quoted = response4.paging.next;
                  var unquoted = quoted.replace(/['"]+/g, '');
                  var url = unquoted.replace('https://graph.facebook.com', '')
                  FB.api(url, function(response5) {
                    console.log(response5);
                    var divContainer = $('#feed');
                    for (i = 0; i < 10; i++) {
                      if (response5.data[i] && response5.data[i].status_type && response5.data[i].status_type == 'shared_story') {
                        if (response5.data[i].name) {
                          str += '<p class="post">' + response5.data[i].name + '</p>';
                        }
                        if (response5.data[i].likes) {
                          str += '<p class="like">' + response5.data[i].likes.data.length + '</p>';
                        }
                        if (!response5.data[i].likes) {
                          str += '<p class="like">0</p>';
                        }
                        document.getElementById("feed").innerHTML = str;
                      }
                    }
                    if (response5.paging.next) {
                      var quoted = response5.paging.next;
                      var unquoted = quoted.replace(/['"]+/g, '');
                      var url = unquoted.replace('https://graph.facebook.com', '')
                      FB.api(url, function(response6) {
                        console.log(response6);
                        var divContainer = $('#feed');
                        for (i = 0; i < 10; i++) {
                          if (response6.data[i] && response6.data[i].status_type && response6.data[i].status_type == 'shared_story') {
                            if (response6.data[i].name) {
                              str += '<p class="post">' + response6.data[i].name + '</p>';
                            }
                            if (response6.data[i].likes) {
                              str += '<p class="like">' + response6.data[i].likes.data.length + '</p>';
                            }
                            if (!response6.data[i].likes) {
                              str += '<p class="like">0</p>';
                            }
                            document.getElementById("feed").innerHTML = str;
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  setTimeout(function () {
    // and call `resolve` on the deferred object, once you're done
    r.resolve();
  }, 5000);
  // return the deferred object
  return r;
}

fbPosts = [];
fbLikes = [];

function loader(){
  var posts = document.querySelectorAll('.post');
  for (i = 0, len = posts.length; i < len; i++) {
    fbPosts.push(posts[i].innerHTML);
  }
  var likes = document.querySelectorAll('.like');
  for (i = 0, len = likes.length; i < len; i++) {
    fbLikes.push(likes[i].innerHTML);
  }
  console.log(fbPosts);
  console.log(fbLikes);
}

function Logout() {
  FB.logout(function() {
    document.location.reload();
  });
  $('#labels').hide(500);
  $('#dashboard').hide(500);
}

// Load the SDK asynchronously
(function(d) {
  var js, id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

// Add get posts event
var postsEvent = function(){
  $(document).on('click', '#getPosts', function() {
    // create a deferred object
    var d = $.Deferred();
    getPosts().done(loader);
    setTimeout(function () {
      // and call `resolve` on the deferred object, once you're done
      d.resolve();
    }, 5000);
    // return the deferred object
    return d;
  })
}

// Logout event
$(document).ready(function(){
  $(document).on('click', '#logOut', function() {
    Logout();
  })
})

///// Facebook Likes Chart /////

// Load google charts package
google.load('visualization', '1.0', {
  packages: ['controls']
});

function drawfbLikesChart() {
  var data = new google.visualization.DataTable();
  // Create rows and columns
  data.addColumn('string', 'Post');
  data.addColumn('number', 'Likes');
  // Add new row for each Facebook page + likes value
  for (var i = 0, len = fbPosts.length; i < len; i++) {
    data.addRow([fbPosts[i], fbLikes[i]]);
  };
  // Set chart options
  var options = {
    title: 'FACEBOOK LIKES',
    'height': 500,
    'fontSize': 12,
    'colors': ['#ff3300'],
    'marginLeft': 0,
    'titleTextStyle': {
      color: '#ff3300',
      fontName: 'Helvetica',
      bold: true,
      fontSize: 32
    }
  };
  var fbLikesChart = new google.visualization.ChartWrapper({
    'chartType': 'ColumnChart',
    'containerId': 'fbLikesChart',
    'options': options
  });
  var filter = new google.visualization.ControlWrapper({
    'controlType': 'StringFilter',
    'containerId': 'stringFilter',
    'options': {
      'filterColumnLabel': 'Post'
    }
  });
  // Create chart
  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));
  dashboard.bind(filter, [fbLikesChart]);
  dashboard.draw(data);

}

var chart = google.setOnLoadCallback(drawfbLikesChart);

postsEvent().done(chart);
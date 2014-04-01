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
      $('#feed p').fadeIn(300);
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
      insight = '/insights?until=1396445517&since=1394631310&method=GET&format=json&suppress_http_code=1&';
      // Build url based on data obtained from pages array
      url = fbUrl + pageID + insight + permToken;
      console.log(url);
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        data: '',
        success: function(response) {
          insightsData = response;
        }
      })
      console.log(insightsData);

      // Get total fans
      totalFansLength = insightsData.data[174].values.length -1;
      totalFans = insightsData.data[174].values[totalFansLength].value;
      $('#total-fans').text(insightsData.data[174].title + ': ' + totalFans);

      //Get new fans/day
      newFans = 0;
      for(i=0, len=insightsData.data[0].values.length; i<len; i++){
        newFans += parseInt(insightsData.data[0].values[i].value);
      }
      newFans = Math.round(newFans / insightsData.data[0].values.length);
      $('#new-fans').text(insightsData.data[0].title + ': ' + newFans);

      // Get lost fans/day
      lostFans = 0;
      for(i=0, len=insightsData.data[3].values.length; i<len; i++){
        lostFans += parseInt(insightsData.data[3].values[i].value);
      }
      lostFans = Math.round(lostFans / insightsData.data[3].values.length);
      $('#lost-fans').text(insightsData.data[3].title + ': ' + lostFans);

      // Get organic post impressions/day
      organicImpressions = 0;
      for(i=0, len=insightsData.data[66].values.length; i<len; i++){
        organicImpressions += parseInt(insightsData.data[66].values[i].value);
      }
      organicImpressions = Math.round(organicImpressions / insightsData.data[110].values.length);
      $('#organic-impressions-day').text(insightsData.data[110].title + ': ' + organicImpressions);

      // Get viral post impressions/day
      viralImpressions = 0;
      for(i=0, len=insightsData.data[72].values.length; i<len; i++){
        viralImpressions += parseInt(insightsData.data[72].values[i].value);
      }
      viralImpressions = Math.round(viralImpressions / insightsData.data[72].values.length);
      $('#viral-impressions-day').text(insightsData.data[72].title + ': ' + viralImpressions);

      // Get engaged users/day
      engagedUsers = 0;
      for(i=0, len=insightsData.data[201].values.length; i<len; i++){
        engagedUsers += parseInt(insightsData.data[201].values[i].value);
      }
      engagedUsers = Math.round(engagedUsers / insightsData.data[202].values.length);
      $('#engaged-users').text(insightsData.data[201].title + ': ' + engagedUsers);

      // Get total consumers/day
      consumers = 0;
      for(i=0, len=insightsData.data[140].values.length; i<len; i++){
        consumers += parseInt(insightsData.data[140].values[i].value);
      }
      consumers = Math.round(consumers / insightsData.data[140].values.length);
      $('#consumers').text(insightsData.data[140].title + ': ' + consumers);

      // Get post-engagement-rate
      postEngagement = Math.round((consumers / totalFans) * 10000) / 100;
      $('#post-engagement-rate').text('Post Engagement Rate: ' + postEngagement + '%'); 

      // Get positive feedback/day
      posFeedback = 0;
      for(i=0, len=insightsData.data[168].values.length; i<len; i++){
        posFeedback += parseInt(insightsData.data[168].values[i].value.like);
      }
      posFeedback = Math.round(posFeedback / insightsData.data[168].values.length);
      $('#positive-feedback').text(insightsData.data[168].title + ': ' + posFeedback);

      // Get negative feedback/day
      negFeedback = 0;
      for(i=0, len=insightsData.data[156].values.length; i<len; i++){
        negFeedback += parseInt(insightsData.data[156].values[i].value);
      }
      negFeedback = Math.round(negFeedback / insightsData.data[156].values.length);
      $('#negative-feedback').text(insightsData.data[156].title + ': ' + negFeedback);

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
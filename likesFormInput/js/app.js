// Local Storage of Table Entries

$(document).ready(function(){

  var brands = $('#fbBrandsTable');
  brandsList = [];
  inputTags = document.getElementsByTagName('input');
  formData = {};
  fbNames = [];
  fbLikes = [];

  // Save form inputs and values to local storage
  $('#save').click(function(e){
    e.preventDefault();
    localStorage.setItem('list', brands.html());
    for(i=0, len=inputTags.length; i<len -1; i++){
      formData[inputTags[i].name] = inputTags[i].value;
    }
    localStorage.setItem('formData', JSON.stringify(formData));
    window.location.reload();
  });
  
  // Empty local storage and reload page
  $('#clear').click(function(e){
    e.preventDefault();
    localStorage.clear('list');
    window.location.reload();
  });

  // Prevent form submission on input + return
  $('.input-button').keypress(function(e){
    if ( e.which == 13 ) e.preventDefault();
  })

  // Create additional form input
  num = 1;
  $('#add').click(function(e){
    e.preventDefault();
    $('#fbBrandsTable').append('<input type="text" class="input-button" placeholder="enter brandname here" name="input' + num + '" id="input' + num + '">');
    num++;
  })
  
  // Get input markup from previous list if exists
  if(localStorage.getItem('list')){
    brands.html(localStorage.getItem('list'));
  }

  // Get object of brand names from previous list if exists
   if(localStorage.getItem('formData')){
    // Parse localstorage form data into JSON object 
    formedData = JSON.parse(localStorage.getItem('formData'));
    // Push each brandname from formData object into brandsList array
    for(var prop in formedData){
      brandsList.push(formedData[prop]);
    }
    // Populate form inputs on reload
    for(i=0, len=inputTags.length; i<len; i++){
      inputTags[i].value = brandsList[i];
    }
    brandsListString = brandsList.toString();
  }

  // Insert string of brand names into facebook url
  var url = 'https://graph.facebook.com/?ids=' + brandsListString + '&accesstoken=' + data + '&callback=?';

  // Get facebook data as JSON
  $.getJSON(url, function(json) {
    $.each(json, function(index, item) {
        fbNames.push(item.name);
        fbLikes.push(item.likes);
    });
  });

});
///// Facebook Likes Chart /////

// Load google charts package
google.load('visualization', '1.0', {packages: ['controls']});

function drawfbLikesChart(){
  var data = new google.visualization.DataTable();
  // Create rows and columns
  data.addColumn('string', 'Brand');
  data.addColumn('number', 'Likes');
  // Add new row for each Facebook page + likes value
  for (var i = 0, len = fbNames.length; i < len; i++) {
    data.addRow([fbNames[i], fbLikes[i]]);
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
      'filterColumnLabel': 'Brand'
    }
  });
  // Create chart
  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));
  dashboard.bind(filter, [fbLikesChart]);
  dashboard.draw(data);

  // Add fbLikes to table
  for (var i = 0, len = fbNames.length; i < len; i++) {
    var likes = document.createElement("li");
    likes.innerHTML = fbLikes[i];
    if(likes.innerHTML !== 'undefined'){
      $('#fbLikesTable').append(likes);
    }
  };
  
}

google.setOnLoadCallback(drawfbLikesChart);


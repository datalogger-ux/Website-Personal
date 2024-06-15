google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var queryString = encodeURIComponent('SELECT A, B');
  var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1j1lQDYrgVHueNyPTC4yfX5BNTYiq9IyBMVDhDEwUQkY/gviz/tq?tq=' + queryString
  );

  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    console.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  var options = {
    curveType: 'function',
    legend: { position: 'bottom' },
    vAxis: { 
      title: 'Suhu Kontroler (°C)',
      titleTextStyle: { 
        italic: false,
        bold: true
      }
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);

  var titleText = 'SENSOR SUHU';
  var chartTitleContainer = document.createElement('div');
  chartTitleContainer.id = 'chart_title';
  chartTitleContainer.innerHTML = titleText;
  document.getElementById('curve_chart').appendChild(chartTitleContainer);

  var dateText = getCurrentDate();
  var dateContainer = document.createElement('div');
  dateContainer.id = 'date_container';
  dateContainer.innerHTML = dateText;
  document.getElementById('curve_chart').appendChild(dateContainer);
}

function getCurrentDate() {
  var currentDate = new Date();
  return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
}

function autoRefreshPage() {
  window.location.reload();
}

setInterval(autoRefreshPage, 10000);

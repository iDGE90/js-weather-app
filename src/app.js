var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText)
    }
}
// xmlHttp.open("GET", 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=a83509480d3c4dbd72473b52e52c59ab', true);
xmlHttp.open("GET", 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a83509480d3c4dbd72473b52e52c59ab', true);
xmlHttp.send(null);
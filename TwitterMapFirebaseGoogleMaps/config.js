// Initialize Firebase
function setup() {
    var config = {
      apiKey: "AIzaSyD9LyF8T_viG6WjI1FcPq22YWdjIbD2VQo",
      authDomain: "raspberry-91dc7.firebaseapp.com",
      databaseURL: "https://raspberry-91dc7.firebaseio.com",
      projectId: "raspberry-91dc7",
      storageBucket: "raspberry-91dc7.appspot.com",
      messagingSenderId: "812054203977",
      appId: "1:812054203977:web:1151f3fafdaca38be7b998"
    };
    firebase.initializeApp(config);

    var db = firebase.database();

    var sensors = db.ref('tuits');
    sensors.on("value", gotData,errData);
}

function gotData(data){
    var tuits = data.val();
    var handle = tuits.username;
    var lat = tuits.lat;
    var lng = tuits.lng;
    var text = tuits.text;

    //console.log(tuits,handle,lat,lng,text);
/*
    var tBody = document.getElementById('dataTable').lastElementChild;
    var tHandle = document.createElement('tr');
    tBody.appendChild(tr1);
    var tHandle = document.createElement('td');
    tHandle.innerText = handle;
    tHandle.appendChild(handle);
    var text1 = document.createElement('td');
    text1.innerText = text;
    text1.appendChild(text);
    var lat1 = document.createElement('td');
    lat1.innerText = lat;
    lat1.appendChild(lat1);
    var lng2 = document.createElement('td');
    lng2.innerText = lng;
    lng2.appendChild(lng);

    var tuitInfo = `<div class= card mt-2> <h6 class= card-title> <a href= ${tw}${twHandle} target="_blank">
    ${twHandle}</a>`+"</h6>"+"<div class= cover cover-small style= background-image:url("+
    urlProf+")></div><div class= card-body> <br><p class= card-text>"+
    text+"</p><br><span class=badge aggressive badge-info>"+
    badge+"</span></div></div>"; */
}
function errData(err){
    console.log('Error!');
    console.log(err);
}

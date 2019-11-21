$(function () {
    //console.log("ready");
});


// --------------fetch_data() function---------------------//
function fetch_data(){
    if (navigator.geolocation) {
        //console.log("geolocation active");
        let x = navigator.geolocation.getCurrentPosition(ongetPos, errors);
    } else {
        console.log("geoloaction not active");
    }
}


// -----------handler function-----------//
function ongetPos(pos) {
    $.ajax({
        type: "get",
        url: "https://api.openweathermap.org/data/2.5/weather?lat="+pos.coords.latitude+"&lon="+pos.coords.longitude+"&appid=6b30ae17ca20cafe9ddccdb52f660c55&units=metric",
        success: function (response) {
            send_output(response); //setting response html
        },
        beforeSend: function(){
            $("#output").html("<div class='col-12'><img src='./loading.gif'></div>");
        }
    });
}

function errors(err) {
    console.log("lnglreng");
    if (err.code == 0) {
        alert("Unknown Error!");
    }
    else if (err.code == 1) {
        alert("Permission Denied!");
    }
    else if (err.code == 2) {
        alert("Position Unavailable");
    }
    else if (err.code == 3) {
        alert("Timeout");
    }
}


function send_output(response){
    //console.log(response);
    var out=$("#output");
    var res="<div class='col-md-12'>";
    res+="<h2>"+response.main.temp+" C</h2>";
    res+="<h3>"+response.name+","+response.sys.country+"</h3>";
    res+="</div>";
    out.html(res);
}
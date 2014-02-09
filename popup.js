function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function creatDivs(games){
  for (var i=0;i<games.length;i++){
    var div = document.createElement("div");
    div.setAttribute("id",games[i]+'Div');
    div.setAttribute("class","headingDiv");
    div.innerHTML=games[i];
    console.log(games[i]+'Div');
    document.getElementById("myDiv").appendChild(div);
  }
}
function writeHTML(){
  var tuples=chrome.extension.getBackgroundPage().tuples;
  var games=[];
  for (var i =0;i<tuples.length;i++){
    if(!include(games,tuples[i].Game)) {
      games.push(tuples[i].Game);
    }
  }

  creatDivs(games);

  for (var i =0;i<tuples.length;i++){
    game = tuples[i].Game;
    name = tuples[i].Name;
    link = tuples[i].Link;
    status = tuples[i].Status;
    div = game+'Div';
    console.log(div);
    htmlText=name+': '+status;
    if (htmlText.length>40){
      htmlText=htmlText.substring(0,40);
    }
    var subDiv = document.createElement("div");
    subDiv.setAttribute("class","gameDiv");
    subDiv.innerHTML='<a target="_blank" href='+link+'>'+ htmlText +'</a>';
    document.getElementById(div).appendChild(subDiv);
  }

  if(tuples.length>0){
    chrome.browserAction.setBadgeBackgroundColor({
      color:[255,0,0,255]
    });
  }
  chrome.browserAction.setBadgeText({
    text:''+tuples.length
  });
}

document.addEventListener('DOMContentLoaded', function () {
  bg=chrome.extension.getBackgroundPage();
  if (bg.tuples!=undefined){
    writeHTML();
  }
});
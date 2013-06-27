function writeHTML(){
  var tuples=chrome.extension.getBackgroundPage().tuples;
  for (var i =0;i<tuples.length;i++){
    console.log(tuples[i].Game+" "+tuples[i].Name+" "+tuples[i].Link);
    game =tuples[i].Game;
    name=tuples[i].Name;
    link=tuples[i].Link;
    document.getElementById("myDiv").innerHTML+= game+ "<br>" +'<a target="_blank" href='+link+'>'+name+'</a>' +'<br>';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  bg=chrome.extension.getBackgroundPage();
  /*
  if (bg.tuples==undefined && !bg.working){
    bg.getChannels();
  }*/
  if (bg.tuples!=undefined){
    writeHTML();
  }
  /*if(!bg.working){
    bg.getChannels();
  }*/

});
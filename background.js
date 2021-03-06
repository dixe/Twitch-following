var fetchFreq=30000;

var tmpTuples ;
var tuples;
var working = false;

function getChannels(){
  working=true;
  console.log("Working is: " +working);
  tmpTuples=[];
  var name = localStorage.name;
  var url = 'https://api.twitch.tv/kraken/users/'+name+'/follows/channels';
  console.log("success")
  $.ajax({
    asyn:false,
    type:"GET",
    url:url,
    success: function (data) {
      antal = data._total;
      console.log("antal: "+antal);
      for (var i =0;i<antal;i++){
        channel=data.follows[i];
        calcHTML(channel);
      }
    }
  });
  var callback = function () {
      if ($.active !== 0) {
        setTimeout(callback, '500');
        return;
      }
      working=false;
      console.log("Working is: " + working);
      tuples=tmpTuples;
      };

  callback();
}

function calcHTML(channel){

    if(channel != undefined){
      var name= channel.channel.name;
      console.log(name);
      var url = "https://api.twitch.tv/kraken/streams/"+name;
      $.ajax({
        asyn:false,
        type:"GET",
        url:url,
        success: function (data2) {
        console.log("Streamdata: :" +data2.stream)
            if (data2.stream!=null){
                game = data2.stream.game;
                link = data2.stream.channel.url;
                status =data2.stream.channel.status;
                var tuple={Game:game, Name:name,Link:link, Status:status}
                console.log("I TUPLEN "+tuple.Game+tuple.Name+tuple.Link);
                tmpTuples.push(tuple);

                // code that update the number of channels online
                chrome.browserAction.setBadgeBackgroundColor({
                        color:[255,0,0,255]
                  });
                // uses tmpTupes as the number of different live channels
                chrome.browserAction.setBadgeText({
                        text:'' + tmpTuples.length
                            });
            }
        }
      });




    }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and parsed :)");
  recursiveCall();
  });

var recursiveCall = function () {
  console.log("Der er called");
  if(!working){
    getChannels();
  }
  setTimeout(recursiveCall, fetchFreq);
  return;
};
var fetchFreq=30000;

var tmpTuples;
var tuples;

var working=false;

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
    var name=channel.channel.name;
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
                console.log("I TUPLEN"+tuple.Game+tuple.Name+tuple.Link);
                tmpTuples.push(tuple);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
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

//setInterval(getChannels(),fetchFreq);
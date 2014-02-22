var childProcess = require("child_process");

var children = [];

var partitions = [
  [ // name of the child along with start and ending URL
    'TANK',
    'wiki/Special:AllPages', 
    'w/index.php?title=Special:AllPages&from=%22Ram+Sajeevan%22'
  ], 
  [ // name of the child along with start and ending URL
    'BULLDOZER',
    'w/index.php?title=Special:AllPages&from=%22Ram+Sajeevan%22', 
    'wiki/Special:AllPages'
  ]
];

partitions.forEach(function(partition){
  var child = childProcess.fork(__dirname + "/scrapeUrls.js", partition);
  child.on("exit", function(){
    console.log(partition[0] + ": DIED :(");
  });
  child.on("message", function(text) {
    console.log(partition[0] + ": " + text);
  });
  children.push(child);
});

process.on("exit", function() {
  children.forEach(function(child){
    child.kill();
  });
});


var childProcess = require("child_process");

var children = [];

var partitions = [
  [ // name of the child along with start and ending URL
    'TANK',
    'wiki/Special:AllPages', 
    'w/index.php?title=Special:AllPages&from=%282Z%2C6Z%29-farnesyl+diphosphate+lyase'
  ], 
  [ // name of the child along with start and ending URL
    'TOZER',
    'wiki/Special:AllPages', 
    'w/index.php?title=Special:AllPages&from=%282Z%2C6Z%29-farnesyl+diphosphate+lyase'
  ],
  [ // name of the child along with start and ending URL
    'BRUDUS',
    'wiki/Special:AllPages', 
    'w/index.php?title=Special:AllPages&from=%282Z%2C6Z%29-farnesyl+diphosphate+lyase'
  ],
  [ // name of the child along with start and ending URL
    'SLAV',
    'wiki/Special:AllPages', 
    'w/index.php?title=Special:AllPages&from=%282Z%2C6Z%29-farnesyl+diphosphate+lyase'
  ]
];

partitions.forEach(function(partition){
  var child = childProcess.fork(__dirname + "/scrapeUrls.js", partition);
  child.on("exit", function(){
    console.log(partition[0] + " FINISHED, BRAH!");
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


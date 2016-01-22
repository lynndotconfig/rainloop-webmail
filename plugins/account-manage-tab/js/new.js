(function(){
    DevDir = '../../../../../../dev/';
    webpack = require('webpack');
    Enums = require(DevDir+'Common/Enums');
    Dir = 
    console.log(DevDir+'Common/Enums');
    var fs = require('fs');
    var path = require('path');
    fs.readdir(DevDir+'Common', function(err, files){
        if(err){
            console.log(err);
        }
        console.log(files);
    })
})();
const readFolder = 'files/';
const extractedFolder = 'extracted/';
const fs = require('fs');
const targz = require('targz');
const extension = '.xml'

fs.readdir(readFolder, (err, files) => {
  files.forEach(file => {
    //console.log('Extracting ' + file);

    //decompress
    targz.decompress({
    src: readFolder + file,
    dest: extractedFolder
    }, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('Extracted ' + file);
        }
        }); // eof Decompress
    }); // eof - forEach loop
}); // eof - parse read folder

//wait for extraction to finish
setTimeout(function() {
    renameFiles();
},1000);

let renameFiles =  function() {
    fs.readdir(extractedFolder, (err, files) => {
        files.forEach(file => {
            if(file.slice(file.length-4, file.length) != extension) {
                fs.rename(extractedFolder + file, extractedFolder + file + extension, function(err) {
                if (err) console.log('ERROR:' + err);
                });
                console.log('Finished renaming: ' + file);
            }
        }); //eof forEach
    }); //eof readdir
}; //eof renameFiles
 
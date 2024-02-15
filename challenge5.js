const path = require("node:path");

function checkFileExtension(filePath, expectedExtension){
    const actual = path.extname(filePath);
    if(actual == expectedExtension){
        console.log(`\nFile has the expected extension ${expectedExtension}\n`);
    }else{
        console.log(`\nFile does not have the expected extension. Expected:${expectedExtension}, Actual:${actual}\n`);
    }
}

checkFileExtension('file1.txt', '.txt');
checkFileExtension('image.png', '.jpg');
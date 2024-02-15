const path = require("node:path");

function resolvePath(relativePath){
    const absolutePath = path.resolve(__dirname, relativePath);
    console.log(`\n Resolved Path: ${absolutePath}\n`);
}

resolvePath('../project/folder/file.txt'); 
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath('nonexistent-folder/file.txt'); 
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt
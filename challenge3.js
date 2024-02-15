const cp = require("node:child_process");

function executeCommmand(command){
    cp.exec(command, (err, stdout, stderr)=>{
        if(err){
            console.error(`\n ${err}`);
            return;
        }
        if(stderr){
            console.log(`\n Command Failed: ${stderr}`);
            return ;
        }
        
        console.log(`\n Command Output: ${stdout}`);
    })
}

executeCommmand('ls -la')
executeCommmand('echo "Hello, Node.js!"');
executeCommmand("dir");
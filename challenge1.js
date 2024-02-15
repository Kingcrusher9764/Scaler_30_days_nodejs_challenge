const fs = require("fs");

function readFileContent(filepath) {
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.log(`\n${err} \n`);
      return;
    }
    console.log(`\nFile Content: ${data}\n`);
  });
}

readFileContent("test-files/file1.txt");
readFileContent("test-files/empty-file.txt");
readFileContent("test-files/nonexistent-file.txt");

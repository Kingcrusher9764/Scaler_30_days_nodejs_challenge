const fs = require("node:fs");
function writeToFile(filepath, content) {
  fs.writeFile(filepath, content, (err, data) => {
    if (err) {
      console.log(`\n${err}\n`);
      return;
    }
    console.log(`\nData written to "${filepath}"\n`);
  });
}
writeToFile("test-files/output1.txt", "Sample content.");
writeToFile(
  "test-files/nonexistent-folder/output.txt",
  "Content in a non-existent folder."
);

import fs from "node:fs";
import path from "node:path";

export function getAllFilesInSubdirectories(dir: string) {
    let files : string[] = [];
    // get all items (files and subdirectories) in the current directory
    const items = fs.readdirSync(dir);  
    // iterate through each item
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();
      if (isDirectory) {
        // if the item is a directory, recursively call the function
        const subdirectoryFiles = getAllFilesInSubdirectories(itemPath);
        files = files.concat(subdirectoryFiles);
      } else {
        // If the item is a file, add it to the files array
        files.push(itemPath);
      }
    });
    return files;
}
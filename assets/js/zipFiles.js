const fs = require("fs");
const archiver = require("archiver");

// Define folders and files to include
const includeItems = [
	"index_en.html",
	"index_fr.html",
	"imsmanifest.xml",
	"assets",
];

// Create a new zip file
// const output = fs.createWriteStream("IRA1-PA3-DEV-FR.zip");
const output = fs.createWriteStream("IRA1-J23-DEV-FR.zip");
const archive = archiver("zip", {
	zlib: { level: 9 }, // Set compression level
});

// Listen for all archive data to be written
output.on("close", function () {
	console.log(archive.pointer() + " total bytes");
	console.log("Files zipped successfully!");
});

// Listen for archive errors
archive.on("error", function (err) {
	console.error("Error zipping files:", err);
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and folders to the archive
includeItems.forEach((item) => {
	if (fs.existsSync(item)) {
		// Check if the item exists
		const stats = fs.statSync(item);
		if (stats.isDirectory()) {
			archive.directory(item, item); // Add directory
		} else {
			archive.file(item, { name: item }); // Add file
		}
	}
});

// Finalize the archive
archive.finalize();

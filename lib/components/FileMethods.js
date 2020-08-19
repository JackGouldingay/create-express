const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");

const FileConfig = require("../config/FileConfig.json");

function CreateFolder(folderName = "", dir = "") {
	return new Promise((resolve, reject) => {
		// Check if the folderName is defiend
		if (folderName === undefined) return reject("FolderName is not defined");
		// Check that the folderName is type of string
		if (typeof folderName !== "string") return reject("FolderName is not a string.");
		// Check that the folderName is not empty
		if (folderName === "") return reject("FolderName can not be empty.");
		// See if the folderName has any characters that are reserved
		if (folderName.search(/[<>:"4/\|?*]/) !== -1) return reject(`FolderName ${folderName} is not allowed.`);
		// See if the folderName is a reserved word
		let invalidName = false;
		FileConfig["reservedNames"].forEach((name) => {
			if (folderName.toLowerCase().includes(name.toLowerCase())) return (invalidName = true);
		});
		if (invalidName) return reject(`FolderName '${folderName}' is not allowed.`);

		// Finally create the folder
		fs.mkdir(dir, (err) => {
			if (err) {
				if (err.code == "EEXIST") reject("Folder already exists.");
			}

			resolve(`'${folderName}' has been created.`);
		});
	});
}

function InitializeNPM(dir) {
	return new Promise((resolve, reject) => {
		exec(`cd ${dir} && npm init -y`, (err, stdout, stderr) => {
			if (err) return reject(err);
			if (stderr) return reject(stderr);

			resolve(`Initialized NPM.`);
		});
	});
}

module.exports = {
	CreateFolder,
	InitializeNPM,
};

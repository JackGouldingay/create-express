const {exec} = require("child_process");
const path = require("path");

class Github {
	constructor() {}

	InitializeGithub(folderName = "", dir = "") {
		return new Promise((resolve, reject) => {
			exec(`cd ${dir} && git init && echo "# ${folderName}" >> README.md`, (err, stdout, stderr) => {
				if (err) return reject(`error: ${err.message}`);

				if (stderr) return reject(`stderr: ${stderr}`);

				resolve("Initialized empty Git Repository.");
			});
		});
	}
}

module.exports = Github;

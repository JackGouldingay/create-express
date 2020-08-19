const {exec} = require("child_process");

class Github {
	constructor() {}

	InitializeGithub() {
		exec("ls", (err, stdout, stderr) => {
			if (err) {
				console.log(`error: ${err.message}`);
				return;
			}

			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}

			console.log(`stdout: ${stdout}`);
		});
	}
}

module.exports = Github;

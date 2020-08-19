const {exec} = require("child_process");
const path = require("path");

const Github = require("../components/Github");
const {Error, promiseFromChildProcess} = require("../components/Methods");
const {CreateFolder} = require("../components/FileMethods");

class CreateAPI extends Github {
	constructor(options = {folderName: ""}) {
		super();
		this.options = options;
		this.CreateFolder();
		// this.InitializeGithub();
	}

	CreateFolder() {
		try {
			let folder = this.options.folderName;
			CreateFolder(folder)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			Error(err);
		}
	}

	CreateExpressRoutes() {
		console.log("Express");
	}
}

module.exports = CreateAPI;

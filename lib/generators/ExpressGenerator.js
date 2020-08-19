const {exec} = require("child_process");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");

const Packages = require("../config/Packages.json");

const Github = require("../components/Github");
const {Error} = require("../components/Methods");
const {CreateFolder, InitializeNPM} = require("../components/FileMethods");

class ExpressGenerator extends Github {
	constructor(options = {folderName: "", type: "", dir: ""}) {
		super();
		console.log(options.dir);
		this.options = options;
		this.dir = path.join(this.options.dir, this.options.folderName);
		this.CreateFolder();
	}

	CreateFolder() {
		try {
			CreateFolder(this.options.folderName, this.dir)
				.then((res) => {
					console.log(res);
					this.InitializeGithub(this.options.folderName, this.dir)
						.then((res) => {
							console.log(res);
							this.CreateExpressRoutes();
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			Error(err);
		}
	}

	CreateExpressRoutes() {
		InitializeNPM(this.dir)
			.then((res) => {
				console.log(res);
				this.InstallPackages()
					.then((res) => {
						console.log(res);
						this.MoveTemplate(this.options.type);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	InstallPackages() {
		return new Promise((resolve, reject) => {
			const type = this.options.type;
			let packages = Packages[type] || [];
			packages = packages.toString().replace(/[,]/g, " ");
			console.log(`Installing NPM packages: ${packages}`);

			exec(`cd ${this.dir} && npm i --save ${packages}`, (err, stdout, stderr) => {
				resolve("Installed Packages");
			});
		});
	}

	MoveTemplate(type) {
		try {
			fsExtra.copy(path.join(__dirname, "../templates", type), this.dir, (err) => {
				if (err) return console.log(err);
				console.log("Moved Files to designated folder.");
			});
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = ExpressGenerator;

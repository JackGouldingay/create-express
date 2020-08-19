const path = require("path");
const fs = require("fs");

const {GetCLIArugments} = require("./components/Methods");
const CreateAPI = require("./generators/CreateAPI");

// Initiate Logger
const date = new Date();
const directoryName = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
const timeOfDay = date.getHours() > 12 ? "PM" : "AM";
const fileName = `${date.getHours()}-${date.getMinutes()}${timeOfDay}.log`;
const filePath = path.join(__dirname, "../", "logs", directoryName, fileName);

fs.mkdir(path.join(__dirname, "../logs", directoryName), (err) => {
	if (!err) console.log(`Created Folder ${directoryName}`);
});
fs.writeFileSync(filePath, "");
const logger = require("./components/Logger")(filePath);

// Fetch arguments from command line
const args = GetCLIArugments();
const express_gen_types = [{type: "api", method: CreateAPI}];

if (args.length > 0) {
	let argType = args.find((item) => item.flag == "type").argument;
	let genType = express_gen_types.find((item) => item.type == argType);

	if (genType != undefined) {
		let generator = new genType.method({folderName: args[0]});
	} else {
		throw "Type is not defined";
	}
}

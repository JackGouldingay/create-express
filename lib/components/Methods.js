function GetCLIArugments() {
	let args = process.argv.slice(2);
	let arguments = [];
	for (let i = 0; i < args.length; i++) {
		let arg = args[i];
		let isFlag = (arg.indexOf("-", 0) || arg.indexOf("--", 0)) == 0 ? true : false;
		arg = arg.replace(/-/gi, "");

		if (isFlag) {
			let obj = {
				flag: arg,
				argument: args[i + 1],
			};
			i++;
			arguments.push(obj);
		} else {
			arguments.push(arg);
		}
	}

	return arguments;
}

function Error(err = "") {
	if (err != undefined) {
		if (typeof err == "string") {
			const date = new Date();
			console.error(
				`${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()} - ${err}`
			);
		} else {
			return "Error message is not a string.";
		}
	} else {
		return "Error Message is not defined.";
	}
}

module.exports = {
	GetCLIArugments,
	Error,
};

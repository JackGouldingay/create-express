const log = require("discord-blackhole.logger");
const mkdirp = require("mkdirp-sync");
const path = require("path");
const fs = require("fs");

const date = new Date();

class Logger extends log.class {
	constructor(path) {
		super();

		this.path = path;
		this.assureFile(this.path);
	}

	assureDirectory(dirname) {
		if (!fs.existsSync(dirname)) mkdirp(dirname);
	}

	assureFile(filename) {
		if (!fs.existsSync(path.dirname(filename))) this.assureDirectory(path.dirname(filename));
	}

	append(content = "") {
		this.assureFile(this.path);
		process.stdout.write(content);
		fs.appendFile(this.path, content, (err) => {
			if (err) process.stdout.write("ERROR Failed to write to file!");
		});
	}

	timeNoColor(type, message) {
		let time = this.format;
		const Time = this.getTimeObject();

		for (let key in Time) {
			const value = Time[key];

			time = time.split("{" + key + "}").join(value);
		}

		return time;
	}

	formatNoColor(type, message) {
		const v = (this.timeNoColor() + " " + type + " " + message.join("") + "\n").replace(/\u001B\[[0-9][0-9]m/gi, "");

		return v;
	}

	log() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("   ", args);
		this.append(msg);

		return this;
	}

	debug() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("DEB", args);
		this.append(msg);

		return this;
	}

	info() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("INF", args);
		this.append(msg);

		return this;
	}

	alert() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("ALR", args);
		this.append(msg);

		return this;
	}

	success() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("SUC", args);
		this.append(msg);

		return this;
	}

	warning() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("WAR", args);
		this.append(msg);

		return this;
	}

	warn() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("WAR", args);
		this.append(msg);

		return this;
	}

	error() {
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("ERR", args);
		this.append(msg);

		return this;
	}
}

module.exports = (p) => {
	const l = new Logger(path.resolve(p));

	const o_log = console.log;
	const o_warn = console.warn;
	const o_err = console.error;
	const o_debug = console.debug;
	const o_info = console.info;

	console.log = function () {
		const args = Array.prototype.slice.call(arguments);
		l.log(...args);
	};

	console.debug = function () {
		const args = Array.prototype.slice.call(arguments);
		l.debug(...args);
	};

	console.info = function () {
		const args = Array.prototype.slice.call(arguments);
		l.log(...args);
	};

	console.alert = function () {
		const args = Array.prototype.slice.call(arguments);
		l.alert(...args);
	};

	console.success = function () {
		const args = Array.prototype.slice.call(arguments);
		l.success(...args);
	};

	console.warn = function () {
		const args = Array.prototype.slice.call(arguments);
		l.warn(...args);
	};

	console.error = function () {
		const args = Array.prototype.slice.call(arguments);
		l.error(...args);
	};

	console.reset = function () {
		console.log = o_log;
		console.debug = o_debug;
		console.wran = o_warn;
		console.error = o_err;
		console.info = o_info;
		console.warning = undefined;
		console.success = undefined;
		console.alert = undefined;
	};

	return l;
};

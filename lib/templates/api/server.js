const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// Local imports
const apiRouter = require("./routes/api/index");

const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Routers
app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "routes/index.html"));
});

// 404 router
app.use((req, res, next) => {
	res.status(404);

	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "routes/404.html"));
		return;
	}

	if (req.accepts("json")) {
		res.send({error: "Not found"});
		return;
	}

	res.type("txt").send("Not found");
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});

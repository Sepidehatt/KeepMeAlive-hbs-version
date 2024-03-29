// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

const bree = require("./cron-job/bree");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Keep Me Alive";

app.locals.appTitle = `${capitalized(projectName)}`;

app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

hbs.registerHelper('isOwner', function(){
    let sessionId = arguments[0]
    let projectOwnerId = arguments[1]

    if (sessionId == projectOwnerId) {
        return true
    }
    return false

});

bree.start()
    .then(() => console.log('bree started'))
    .catch((err) => console.log('error starting bree', err))

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const projectRoutes = require("./routes/projects.routes")
app.use("/projects", projectRoutes)

const authRoutes = require("./routes/auth.routes");

app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;






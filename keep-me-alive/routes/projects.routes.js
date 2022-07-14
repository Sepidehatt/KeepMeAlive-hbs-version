const router = require('express').Router();

const Project = require("../models/Project.model")

router.get("/", (req, res) => {
    res.send("hello world")
})

module.exports = router
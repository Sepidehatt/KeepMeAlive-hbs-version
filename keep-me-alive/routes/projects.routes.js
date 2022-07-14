const router = require('express').Router();

const Project = require("../models/Project.model")

router.get("/", (req, res) => {
    Project.find()
        .then(() => {
            console.log('I can pull projects from DB')
        })
        .catch()

    res.render("projects/projects")
})

module.exports = router
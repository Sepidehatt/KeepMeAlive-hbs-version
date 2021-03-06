const router = require('express').Router();
const axios = require('axios')
const Project = require("../models/Project.model")

router.get("/", (req, res) => {
  Project.find()
    .then((projectsArr) => {
      console.log(projectsArr)
      res.render('projects/projects', { projects: projectsArr })
    })
    .catch(err => {
      console.log("error getting project on DB", err)
      next(err);
    });
})



router.get("/add-project", (req, res) => {
  res.render("projects/add-project")
})


router.post('/add-project', (req, res) => {
  const {
    endPointsLink,
    clientSideLink,
    activeUserName,
    activePassword
  } = req.body
  // console.log(req.body, "reqqqqqqqqq")


  Project.create({
    endPointsLink,
    clientSideLink,
    activeUserName,
    activePassword
  })
    .then((projectFromDb) => res.redirect("/"))
    .catch(err => {
      console.log("error creating Project on DB", err)
    })

})



  // Project.find()
  //   .then(projectsArr => {
  //     projectsArr.forEach(project=>{
  //       axios.post(project.endPointsLink,{userName: project.activeUserName,password : project.activePassword})
  //       .then()
  //     })
  //   })




module.exports = router
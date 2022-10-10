function checkOwnership(loggedId, project, errorMessage){
  if (loggedId !== project.owner._id.toString()) {
    const error = new Error(errorMessage)
    error.status = 401
    error.type = "ownership"
    console.log(error)
    throw error 
  }
}

module.exports = checkOwnership


const { Schema, model } = require("mongoose");


const projectSchema = new Schema({
  endPointsLink: {
    type: String,
    required: true
  },
  clientSideLink: {
    type: String,
    // required: true
  },
  activeUserName: {
    type: String,
    required: true
  },
  activePassword: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
})



const Project = model("Project", projectSchema)
module.exports = Project;





// const arr =[a,b,c,d]

// arr.forEach( (element)=>{
//   axios.post('${element}')
//   .then()
//   .catch()
// })


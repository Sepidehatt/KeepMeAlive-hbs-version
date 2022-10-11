const { Schema, model } = require("mongoose");


const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  endPointsLink: {
    type: String,
    required: true
  },
  // This piece of code is to be decided after if we keep it or not
  // clientSideLink: {
  //   type: String,
  //   required: true
  // },
  // activeUserName: {
  //   type: String,
  //   required: true
  // },
  // activePassword: {
  //   type: String,
  //   required: true
  // },
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

const Bree = require('bree')

const bree = new Bree({
  jobs:[
    {
      name: 'keep-alive',
      interval: 'every 4 days'
    }
  ]
})

module.exports = bree
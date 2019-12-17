const config = require('../../config')

exports.id = 'toggleActivation'

exports.method = () => config.toggleActivation()
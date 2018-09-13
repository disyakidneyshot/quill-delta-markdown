const { unset } = require('lodash')

function changeAttribute(attributes, event, attribute, value) {
  if (event.entering) {
    attributes[attribute] = value
  } else {
    attributes = unset(attributes, attribute)
  }
  return attributes
}

function applyAttribute(node, event, attributes, attribute) {
  if (typeof attribute == 'string') {
    changeAttribute(attributes, event, attribute, true)
  } else if (typeof attribute == 'function') {
    attribute(node, event, attributes)
  }
}

module.exports = {
  changeAttribute,
  applyAttribute,
}

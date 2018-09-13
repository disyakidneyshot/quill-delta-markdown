const encodeLink = (link) =>
  encodeURI(link)
    .replace(/\(/i, "%28")
    .replace(/\)/i, "%29")
    .replace(/(\?|\&)response-content-disposition=attachment.*$/, "")

module.exports = {
  encodeLink,
}

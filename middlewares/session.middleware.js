const shortId = require("shortid");

const db = require("../db.js");

module.exports = (request, response, next) => {
  if (!request.signedCookies.sessionId) {
    var sessionId = shortId.generate();
    response.cookie("sessionId", sessionId, {
      signed: true
    });
    db.get("sessions")
      .push({
        id: sessionId
      })
      .write();
  }
  next();
};

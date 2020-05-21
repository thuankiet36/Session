const shortId = require("shortid");
const Session = require("../models/session.model");
const db = require("../db.js");

// module.exports = (request, response, next) => {
//   if (!request.signedCookies.sessionId) {
//     var sessionId = shortId.generate();
//     response.cookie("sessionId", sessionId, {
//       signed: true,
//     });
//     db.get("sessions")
//       .push({
//         id: sessionId,
//       })
//       .write();
//   }
//   next();
// };

module.exports = async (request, response, next) => {
  if (!request.signedCookies.sessionId) {
    var session = new Session();
    response.cookie("sessionId", session._id, {
      signed: true,
    });
    try {
      session = await session.save();
    } catch (e) {
      next(e);
    }
  }
  next();
};

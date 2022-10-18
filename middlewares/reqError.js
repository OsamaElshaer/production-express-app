const { getLogger } = require("../services/logger");

exports.reqError = (err, req, res, next) => {
  if (err) {
    getLogger("logger middleware").error(err);
  }
  return res.status(500).json({ error: "Something went wrong" });
};

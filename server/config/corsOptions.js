const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: true
};

module.exports = { corsOptions };


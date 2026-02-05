const cds = require("@sap/cds");

module.exports = function custom_auth(req, res, next) {
  req.user = new cds.User({
    id: "E1003",
    roles: ["authenticated-user"],
    attr: {
      employeeUUID: "a1d2c3e4-0001-4f10-8a11-333333333333",
      email: "jordan.lee@example.com",
      region: "US",
      businessUnit: "Consulting",
      firstName: "Jordan",
      lastName: "Lee",
    },
  });

  return next();
};

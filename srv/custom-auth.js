const cds = require("@sap/cds");

module.exports = function custom_auth(req, res, next) {
  req.user = new cds.User({
    id: "E1002",
    roles: ["authenticated-user"],
    attr: {
      employeeUUID: "a1d2c3e4-0002-4f10-8a11-222222222222",
      email: "meera.iyer@example.com",
      region: "US",
      businessUnit: "Consulting",
      firstName: "Meera",
      lastName: "Iyer",
    },
  });

  return next();
};

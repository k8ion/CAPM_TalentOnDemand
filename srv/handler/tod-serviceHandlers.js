const cds = require("@sap/cds");
//const { SELECT } = require("@sap/cds/lib/ql/cds-ql");
const { SELECT } = cds.ql;

module.exports = (srv) => {
  const { Employees, WellBeingSubsidies, PTO, WellbeingProduct, MyWellbeingProducts, Holidaylist, CoachInformation, DevelopmentPlan, resourceManager, MyHolidaylist } = srv.entities;

  const WellBeingRemaining = async (req) => {
    const tx = cds.tx(req);

    // Individual employee identity 
    const userId = req?.user?.id;
    if (!userId) return req.reject(401, "No logged-in user id available");

    // Find employee by business id, get technical key (ID)
    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) return req.reject(404, `Employee not found for UserId: ${userId}`);

    // Wallet is stored by employee_ID (Employee primary key)
    const wallet = await tx.run(SELECT.one.from(WellBeingSubsidies).where({ employee_ID: emp.ID }));
    const total = Number(wallet.totalAmount ?? 25000);
    const spent = Number(wallet.spentAmount ?? 0);
    const remaining = Math.max(0, total - spent);

    return {
      userId: emp.UserId,
      currency: wallet.currency || "INR",
      total,
      spent,
      remaining,
    };
  };

  const PTOHours = async (req) => {
    const tx = cds.tx(req);

    const userId = req?.user?.id;
    if (!userId) return req.reject(401, "No logged-in user id available");

    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) return req.reject(404, `Employee not found for UserId: ${userId}`);

    const allHours = await tx.run(SELECT.one.from(PTO).where({ employee_ID: emp.ID }));

    if (!allHours) return req.reject(404, `PTO not found for employee: ${emp.ID}`);

    return {
      userId: emp.UserId,
      overallRemainingHrs: allHours.overallRemainingHrs,
      privilegeRemainingHrs: allHours.privilegeRemainingHrs,
      casualSickRemainingHrs: allHours.casualSickRemainingHrs,
    };
  };

  //My Wellbeing Products handler for Fiori
  srv.on("READ", MyWellbeingProducts, async (req) => {
    const tx = cds.tx(req);

    const userId = req?.user?.id;
    if (!userId) req.reject(401, "No logged-in user id available");

    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) req.reject(404, `Employee not found for UserId: ${userId}`);

    const subsidy = await tx.run(
      SELECT.one.from(WellBeingSubsidies).where({ employee_ID: emp.ID })
    );
    if (!subsidy) return [];

    req.query.where({ subsidy_ID: subsidy.ID });
    return tx.run(req.query);
  });

  //Holiday List handler for Fiori
  srv.on("READ", MyHolidaylist, (req) => cds.tx(req).run(req.query));


  //Next Holiday function
  const nextHoliday = async (req) => {
    const tx = cds.tx(req);

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const today = now.toISOString().slice(0, 10);

    const holiday = await tx.run(SELECT.one.from(Holidaylist).columns("ID", "day", "holidayName", "date", "description")
      .where({ date: { ">=": today } })
      .orderBy("date asc"));

    if (!holiday) req.reject(404, "No upcoming holiday found");

    return holiday;
  }


  //fetch Coach Information
  const coachInformaiton = async (req) => {
    const tx = cds.tx(req);

    const userId = req?.user?.id;
    if (!userId) return req.reject(401, "No logged-in user id available");

    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) return req.reject(404, `Employee not found for UserId: ${userId}`);

    const coachName = await tx.run(SELECT.from(CoachInformation).where({ employee_ID: emp.ID }));

    if (!coachName) return req.reject(404, `Coach not found for employee: ${emp.ID}`);

    return coachName;
  }


  //fetch Development Path
  const devPath = async (req) => {
    const tx = cds.tx(req);

    const userId = req?.user?.id;
    if (!userId) return req.reject(401, "No logged-in user id available");

    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) return req.reject(404, `Employee not found for UserId: ${userId}`);

    const dPaths = await tx.run(SELECT.from(DevelopmentPlan).where({ employee_ID: emp.ID }));
    if (!dPaths) return req.reject(404, `Development Path not found for employee: ${emp.ID}`);

    return dPaths;
  }

  //fetch Resource Manager data
  const RMInformation = async (req) => {
    const tx = cds.tx(req);

    const userId = req?.user?.id;
    if (!userId) return req.reject(401, "No logged-in user id available");

    const emp = await tx.run(SELECT.one.from(Employees).where({ UserId: userId }));
    if (!emp) return req.reject(404, `Employee not found for UserId: ${userId}`);

    const rmName = await tx.run(SELECT.from(resourceManager).where({ employee_ID: emp.ID }));

    if (!rmName) return req.reject(404, `Resource Manager not found for employee: ${emp.ID}`);

    return rmName;
  }

  return { WellBeingRemaining, PTOHours, nextHoliday, coachInformaiton, devPath, RMInformation };
};

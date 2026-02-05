const cds = require("@sap/cds");
//const { SELECT } = require("@sap/cds/lib/ql/cds-ql");
const { SELECT } = cds.ql;

module.exports = (srv) => {
  const { Employees, WellBeingSubsidies, PTO } = srv.entities;

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

    const allHours = await tx.run(SELECT.one.from(PTO).where({ employee_ID: emp.ID })
    );
    if (!allHours) return req.reject(404, `PTO not found for employee: ${emp.ID}`);

    return {
      userId: emp.UserId,
      overallRemainingHrs: allHours.overallRemainingHrs,
      privilegeRemainingHrs: allHours.privilegeRemainingHrs,
      casualSickRemainingHrs: allHours.casualSickRemainingHrs,
    };
  };

  return { WellBeingRemaining, PTOHours };
};

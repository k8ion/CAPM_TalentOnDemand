const cds = require("@sap/cds");
const handlersFactory  = require("./handler/tod-serviceHandlers");

class TalentOnDemandService extends cds.ApplicationService {
  async init() {
    const handler = handlersFactory(this);

    this.on("getWellBeingRemaining", handler.WellBeingRemaining);
    this.on("getPTOHours", handler.PTOHours);
    
    return super.init();
  }
}

module.exports = { TalentOnDemandService };

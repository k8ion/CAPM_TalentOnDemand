//const { error } = require("@sap/cds");

//const { func } = require("@sap/cds/lib/ql/cds-ql");

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "talentondemand/model/formatter",
  "sap/ui/core/Fragment"
], function (Controller, JSONModel, MessageToast, formatter, Fragment) {
  "use strict";

  return Controller.extend("talentondemand.controller.Tod", {
    formatter: formatter,

    onInit: function () {
      //initialize models
      this._initializeModels();

      //Console log Models  
      var oViewModel = this.getView().getModel("viewModel");
      console.log("View Model: ", oViewModel.getData());

      var oWellbeingModel = this.getView().getModel("wellbeing");
      console.log("WellbeingModel:", oWellbeingModel.getData());

      var oPTOModel = this.getView().getModel("ptoModel");
      console.log("oPTOModel: ", oPTOModel.getData());


      //ToD Load Functions 
      this._loadWellBeingData();
      this._loadPTOData();
      this._loadNextHolidayData();
      this._loadCoachInfoData();
      this._loadDevPathData();
      this._loadRMData();
    },

    _initializeModels: function () {

      this.oViewModel = new JSONModel({
        userName: "Kshitij",
        userInitials: "KSN"
      });

      this.oWellbeingModel = new JSONModel({
        userId: "",
        currency: "INR",
        total: 0,
        spent: 0,
        remaining: 0
      });

      this.oPTOModel = new JSONModel({
        userId: "",
        overallRemainingHrs: 0,
        privilegeRemainingHrs: 0,
        casualSickRemainingHrs: 0
      });

      this.oCoachInfoModel = new JSONModel({
        userId: "",
        coachName: ""
      });

      this.oDevelopmentPath = new JSONModel({
        userId: "",
        Completed: 0,
        Enrolled: 0,
        NotEnrolled: 0
      })

      this.oRMInfoModel = new JSONModel({
        userId: "",
        managerName: ""
      })

      this.oapplyPTOModel = new JSONModel({
        leaveType: "",
        startDate: null,
        endDate: null,
        leadEmail: "",
        rationale: ""
      })

      // Set models on view
      this.getView().setModel(this.oViewModel, "viewModel");
      this.getView().setModel(this.oWellbeingModel, "wellbeing");
      this.getView().setModel(this.oPTOModel, "ptoModel");
      this.getView().setModel(this.oCoachInfoModel, "coachInfoModel");
      this.getView().setModel(this.oDevelopmentPath, "developmentPathModel");
      this.getView().setModel(this.oRMInfoModel, "rmInfoModel");
      this.getView().setModel(this.oapplyPTOModel, "applyPTOModel");
    },

    //fetching wellBeing data
    _loadWellBeingData: function () {

      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getWellBeingRemaining(...)");

      oContext.execute()
        .then(function () {
          var oResult = oContext.getBoundContext().getObject();

          // Get the wellbeing model - try both approaches
          var oWellbeingModel = this.oWellbeingModel || this.getView().getModel("wellbeing");

          if (!oWellbeingModel) {
            MessageToast.show("Error: Wellbeing Model initialization failed");
            return;
          }

          // Update the model with received data
          oWellbeingModel.setData({
            userId: oResult.userId,
            currency: oResult.currency,
            total: oResult.total,
            spent: oResult.spent,
            remaining: oResult.remaining
          });

        }.bind(this))

        .catch(function (oError) {
          MessageToast.show("Failed to load wellbeing data: " + (oError.message || oError));
        });
    },

    //fetching PTO data
    _loadPTOData: function () {
      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getPTOHours(...)");

      oContext.execute()
        .then(() => {
          const oResult = oContext.getBoundContext().getObject();
          this.getView().getModel("ptoModel").setData(oResult);
        })

        .catch((error) => {
          MessageToast.show(error.message);
        })
    },

    //fetch next holiday data
    _loadNextHolidayData: function () {
      // OData V4 function import call (no params) uses "(...)"
      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getNextHoliday(...)");

      oContext.execute()
        .then(function () {
          var oHolidayCtx = oContext.getBoundContext(); // holds holidayName/date/description
          this.byId("s_Id_HolidayListCard_VBox1").setBindingContext(oHolidayCtx); // default model
        }.bind(this))
        .catch(function (oError) {
          MessageToast.show("Failed to load holiday: " + (oError.message || oError));
        });
    },


    //fetch coach information data
    _loadCoachInfoData: function () {
      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getCoachInformation(...)");

      oContext.execute()
        .then(() => {
          const oResult = oContext.getBoundContext().getObject();
          this.getView().getModel("coachInfoModel").setData({
            userId: oResult.userId,
            coachName: oResult.coachName
          });
        })

        .catch((error) => {
          MessageToast.show(error.message);
        })
    },

    //fetch development path
    _loadDevPathData: function () {
      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getDevelopmentPlan(...)");

      oContext.execute()
        .then(() => {
          const oResult = oContext.getBoundContext().getObject();
          this.getView().getModel("developmentPathModel").setData({
            userId: oResult.userId,
            Completed: oResult.Completed,
            Enrolled: oResult.Enrolled,
            NotEnrolled: oResult.NotEnrolled
          });
        })

        .catch((error) => {
          MessageToast.show(error.message);
        })
    },

    //fetch rm information data
    _loadRMData: function () {
      var oModel = this.getOwnerComponent().getModel();
      var oContext = oModel.bindContext("/getRMInformation(...)");

      oContext.execute()
        .then(() => {
          const oResult = oContext.getBoundContext().getObject();
          this.getView().getModel("rmInfoModel").setData({
            userId: oResult.userId,
            managerName: oResult.managerName
          });
        })

        .catch((error) => {
          MessageToast.show(error.message);
        })
    },


    OnWellBeingSubsidyPress: function () {
      sap.m.URLHelper.redirect("/wellbeingproducts/webapp/index.html", true);
    },

    onHolidayNavPress: function () {
      sap.m.URLHelper.redirect("/holidaylist/webapp/index.html", true);
    },

    onapplyPTONavPress: async function () {
      if (!this._pPtoDialog) {
        this._pPtoDialog = Fragment.load({
          id: this.getView().getId(),
          name: "talentondemand.view.fragments.applyPTO",
          controller: this
        }).then((oDialog) => {
          this.getView().addDependent(oDialog);
          return oDialog;
        });
      }
      const oDialog = await this._pPtoDialog;
      oDialog.open();
    },

    onPtoCancelPress: async function () {
      const oDialog = await this._pPtoDialog;
      oDialog.close();
    },

    onPtoSendPress: async function () {
      const oData = this.getView().getModel("ptoApply").getData();

      // basic validation
      const rEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!oData.leaveType || !oData.startDate || !oData.endDate || !oData.leadEmail) {
        MessageBox.error("Please fill leave type, dates, and lead email.");
        return;
      }
      if (!rEmail.test(oData.leadEmail)) {
        MessageBox.error("Please enter a valid lead email.");
        return;
      }

      // OPTION A (recommended): call backend API that sends email
      // You implement /api/pto/apply on your server (CAP/Node/ABAP/etc.) to send the email.
      try {
        const res = await fetch("/api/pto/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(oData)
        });
        if (!res.ok) throw new Error("Request failed");
        MessageToast.show("Request sent to your lead.");
        const oDialog = await this._pPtoDialog;
        oDialog.close();
      } catch (e) {
        // OPTION B (fallback): open user's mail client (does not send automatically)
        const sSubject = encodeURIComponent(`PTO Request (${oData.leaveType}) ${oData.startDate} to ${oData.endDate}`);
        const sBody = encodeURIComponent(
          `Hi,\n\nI’d like to request PTO.\n` +
          `Type: ${oData.leaveType}\n` +
          `Dates: ${oData.startDate} to ${oData.endDate}\n` +
          `Reason: ${oData.reason || "-"}\n\nThanks`
        );
        window.location.href = `mailto:${encodeURIComponent(oData.leadEmail)}?subject=${sSubject}&body=${sBody}`;
      }
    },

    // OnWellBeingSubsidyPress: function () {
    //   sap.ui.core.UIComponent.getRouterFor(this).navTo("WellbeingProductList");
    // },

    onPressHamburger: function () {
      MessageToast.show("Menu pressed");
    },

    onPressBrand: function () {
      MessageToast.show("Brand pressed");
    },

    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query") || "";
      MessageToast.show("Search: " + sQuery);
    },

    onSearchLiveChange: function (oEvent) {
      var sValue = oEvent.getParameter("newValue") || "";
    },

    onPressWhatsNew: function () {
      MessageToast.show("What's New");
    },

    onPressHelp: function () {
      MessageToast.show("Help");
    },

    onPressSettings: function () {
      MessageToast.show("Settings");
    },

    onPressNotifications: function () {
      MessageToast.show("Notifications");
    },

    onUserMenuSelect: function (oEvent) {
      var sKey = oEvent.getParameter("item").getKey();
      MessageToast.show("User menu: " + sKey);
    }
  });
});

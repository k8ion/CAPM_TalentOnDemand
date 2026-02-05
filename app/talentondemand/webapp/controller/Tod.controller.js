sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "talentondemand/model/formatter"
], function (Controller, JSONModel, MessageToast, formatter) {
  "use strict";

  return Controller.extend("talentondemand.controller.Tod", {
    formatter: formatter,

    onInit: function () {
      //initialize models
      this._initializeModels();

      var oViewModel = this.getView().getModel("viewModel");
      console.log("View Model: ", oViewModel.getData());

      var oWellbeingModel = this.getView().getModel("wellbeing");
      console.log("WellbeingModel:", oWellbeingModel.getData());

      var oPTOModel = this.getView().getModel("ptoModel");
      console.log("oPTOModel: ", oPTOModel.getData());


      this._loadWellBeingData();
      this._loadPTOData();
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

      // Set models on view
      this.getView().setModel(this.oViewModel, "viewModel");
      this.getView().setModel(this.oWellbeingModel, "wellbeing");
      this.getView().setModel(this.oPTOModel, "ptoModel");
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

    OnWellBeingSubsidyPress: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      // oRouter.navTo("WellbeingDetails");
      oRouter.navTo("WellbeingProductList");
    },

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

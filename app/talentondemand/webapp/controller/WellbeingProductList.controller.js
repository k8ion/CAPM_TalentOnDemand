sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("talentondemand.controller.WellbeingProductList", {

        onInit: function () {
            // Initialize view model
            var oViewModel = new JSONModel({
                products: [],
                totalAmount: 0,
                spentAmount: 0,
                remainingAmount: 0,
                currency: "INR"
            });
            this.getView().setModel(oViewModel, "viewModel");

            // Attach route
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("WellbeingProductList").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this._loadWellbeingData();
        },

        _loadWellbeingData: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            var oViewModel = this.getView().getModel("viewModel");
            
            // Get logged-in user's employee ID
            var sEmployeeID = this._getLoggedInEmployeeID();
            
            // Show busy indicator
            this.getView().setBusy(true);
            
            // Create list binding for OData V4
            var oListBinding = oModel.bindList("/WellBeingSubsidy", undefined, undefined, 
                [new Filter("employee_ID", FilterOperator.EQ, sEmployeeID)],
                {
                    $expand: "products"
                }
            );
            
            // Request contexts (data)
            oListBinding.requestContexts(0, 1).then(function (aContexts) {
                that.getView().setBusy(false);
                
                if (aContexts && aContexts.length > 0) {
                    var oContext = aContexts[0];
                    var oSubsidy = oContext.getObject();
                    
                    // Set data to view model
                    oViewModel.setProperty("/totalAmount", oSubsidy.totalAmount);
                    oViewModel.setProperty("/spentAmount", oSubsidy.spentAmount);
                    oViewModel.setProperty("/remainingAmount", oSubsidy.totalAmount - oSubsidy.spentAmount);
                    oViewModel.setProperty("/currency", oSubsidy.currency);
                    oViewModel.setProperty("/products", oSubsidy.products || []);
                    
                    MessageToast.show((oSubsidy.products ? oSubsidy.products.length : 0) + " products loaded");
                } else {
                    MessageBox.information("No wellbeing subsidy found for your profile.");
                }
            }).catch(function (oError) {
                that.getView().setBusy(false);
                MessageBox.error("Failed to load wellbeing data: " + (oError.message || "Unknown error"));
            });
        },

        _getLoggedInEmployeeID: function () {
            // TODO: Replace with actual logged-in user logic
            return "a1d2c3e4-0001-4f10-8a11-111111111111";
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            this._applyFilters(sQuery);
        },

        onFilterGo: function () {
            var sQuery = this.byId("searchField").getValue();
            this._applyFilters(sQuery);
        },

        onFilterClear: function () {
            this.byId("searchField").setValue("");
            this._applyFilters("");
        },

        _applyFilters: function (sQuery) {
            var oTable = this.byId("productsTable");
            var oBinding = oTable.getBinding("items");
            
            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter({
                    filters: [
                        new Filter("productName", FilterOperator.Contains, sQuery),
                        new Filter("productID", FilterOperator.Contains, sQuery),
                        new Filter("vendor", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                });
                aFilters.push(oFilter);
            }
            
            oBinding.filter(aFilters);
        },

        onProductPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("viewModel");
            var oProduct = oContext.getObject();
            
            MessageBox.information(
                "Product Details:\n\n" +
                "Name: " + oProduct.productName + "\n" +
                "ID: " + oProduct.productID + "\n" +
                "Vendor: " + oProduct.vendor + "\n" +
                "Amount: " + oProduct.amount + " " + this.getView().getModel("viewModel").getProperty("/currency") + "\n" +
                "Date: " + oProduct.receiptDate
            );
        },

        onExport: function () {
            MessageToast.show("Export functionality to be implemented");
            // TODO: Implement spreadsheet export
        },

        onTableSettings: function () {
            MessageToast.show("Table personalization to be implemented");
            // TODO: Implement P13nDialog for column customization
        },

        onNavBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Tod");
        }

    });
});

sap.ui.define([
  "sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
  "use strict";

  return {

    formatCurrency: function (value) {
      if (!value && value !== 0) {
        return "₹ 0";
      }
      
      var oNumberFormat = NumberFormat.getFloatInstance({
        groupingEnabled: true,
        groupingSeparator: ",",
        decimalSeparator: ".",
        minFractionDigits: 0,
        maxFractionDigits: 2
      });
      
      return "₹ " + oNumberFormat.format(value);
    }
  };
});

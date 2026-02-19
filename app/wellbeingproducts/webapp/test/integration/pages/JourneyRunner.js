sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"deloittetod/tod/wellbeingproducts/test/integration/pages/WellbeingProductList",
	"deloittetod/tod/wellbeingproducts/test/integration/pages/WellbeingProductObjectPage"
], function (JourneyRunner, WellbeingProductList, WellbeingProductObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('deloittetod/tod/wellbeingproducts') + '/test/flp.html#app-preview',
        pages: {
			onTheWellbeingProductList: WellbeingProductList,
			onTheWellbeingProductObjectPage: WellbeingProductObjectPage
        },
        async: true
    });

    return runner;
});


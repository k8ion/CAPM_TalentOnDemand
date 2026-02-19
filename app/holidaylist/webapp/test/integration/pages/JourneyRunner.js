sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/deloitte/tod/holidaylist/holidaylist/test/integration/pages/HolidaylistList",
	"com/deloitte/tod/holidaylist/holidaylist/test/integration/pages/HolidaylistObjectPage"
], function (JourneyRunner, HolidaylistList, HolidaylistObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/deloitte/tod/holidaylist/holidaylist') + '/test/flp.html#app-preview',
        pages: {
			onTheHolidaylistList: HolidaylistList,
			onTheHolidaylistObjectPage: HolidaylistObjectPage
        },
        async: true
    });

    return runner;
});


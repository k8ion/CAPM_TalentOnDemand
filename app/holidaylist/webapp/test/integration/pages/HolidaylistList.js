sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.deloitte.tod.holidaylist.holidaylist',
            componentId: 'HolidaylistList',
            contextPath: '/Holidaylist'
        },
        CustomPageDefinitions
    );
});
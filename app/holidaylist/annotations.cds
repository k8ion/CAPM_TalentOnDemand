using TalentOnDemandService as service from '../../srv/talent-ondemand-service';

annotate service.Holidaylist with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'day',
                Value: day,
            },
            {
                $Type: 'UI.DataField',
                Label: 'holidayName',
                Value: holidayName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'date',
                Value: date,
            },
            {
                $Type: 'UI.DataField',
                Label: 'description',
                Value: description,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Day',
            Value: day,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Holiday Name',
            Value: holidayName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Date',
            Value: date,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: description,
        },
    ],
);


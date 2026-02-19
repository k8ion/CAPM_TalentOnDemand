using TalentOnDemandService as service from '../../srv/talent-ondemand-service';

annotate service.MyWellbeingProducts with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Product ID',
        Value: productID
    },
    {
        $Type: 'UI.DataField',
        Label: 'Product Name',
        Value: productName
    },
    {
        $Type: 'UI.DataField',
        Label: 'Description',
        Value: description
    },
    {
        $Type: 'UI.DataField',
        Label: 'Vendor',
        Value: vendor
    },
    {
        $Type: 'UI.DataField',
        Label: 'Amount',
        Value: amount
    },
    {
        $Type: 'UI.DataField',
        Label: 'Receipt Date',
        Value: receiptDate
    }
]);

annotate service.MyWellbeingProducts with @(UI.SelectionFields: [
    productID,
    productName,
    vendor
], );

annotate service.MyWellbeingProducts with {
    productID   @Common.Label: 'Product ID';
    productName @Common.Label: 'Product Name';
    description @Common.Label: 'Description';
    vendor      @Common.Label: 'Vendor';
    amount      @Common.Label: 'Amount';
    receiptDate @Common.Label: 'Receipt Date';
};

// annotate service.WellbeingProduct with @(
//     UI.FieldGroup #GeneratedGroup: {
//         $Type: 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'productID',
//                 Value: productID,
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'productName',
//                 Value: productName,
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'description',
//                 Value: description,
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'vendor',
//                 Value: vendor,
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'amount',
//                 Value: amount,
//             },
//             {
//                 $Type: 'UI.DataField',
//                 Label: 'receiptDate',
//                 Value: receiptDate,
//             },
//         ],
//     },
//     UI.Facets                    : [{
//         $Type : 'UI.ReferenceFacet',
//         ID    : 'GeneratedFacet1',
//         Label : 'General Information',
//         Target: '@UI.FieldGroup#GeneratedGroup',
//     }, ],
//     UI.LineItem                  : [
//         {
//             $Type: 'UI.DataField',
//             Label: 'productID',
//             Value: productID,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'productName',
//             Value: productName,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'description',
//             Value: description,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'vendor',
//             Value: vendor,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'amount',
//             Value: amount,
//         }
//     ],
// );

// annotate service.WellbeingProduct with {
//     subsidy @Common.ValueList: {
//         $Type         : 'Common.ValueListType',
//         CollectionPath: 'WellBeingSubsidies',
//         Parameters    : [
//             {
//                 $Type            : 'Common.ValueListParameterInOut',
//                 LocalDataProperty: subsidy_ID,
//                 ValueListProperty: 'ID',
//             },
//             {
//                 $Type            : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty: 'totalAmount',
//             },
//             {
//                 $Type            : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty: 'spentAmount',
//             },
//             {
//                 $Type            : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty: 'currency',
//             },
//         ],
//     }
// };

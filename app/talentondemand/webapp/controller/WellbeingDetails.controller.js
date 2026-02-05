sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("talentondemand.controller.WellbeingDetails", {

        onInit: function () {
            // Load static eligible items data
            var oEligibleItemsData = {
                Fitness: [
                    {
                        itemName: "Gym Membership",
                        description: "Annual or monthly gym membership fees",
                        maxAmount: "Up to ₹5,000"
                    },
                    {
                        itemName: "Yoga Classes",
                        description: "Professional yoga training sessions",
                        maxAmount: "Up to ₹3,000"
                    },
                    {
                        itemName: "Sports Equipment",
                        description: "Exercise equipment, sports gear",
                        maxAmount: "Up to ₹4,000"
                    },
                    {
                        itemName: "Personal Training",
                        description: "Professional fitness trainer sessions",
                        maxAmount: "Up to ₹6,000"
                    },
                    {
                        itemName: "Swimming Classes",
                        description: "Swimming lessons and pool membership",
                        maxAmount: "Up to ₹3,500"
                    }
                ],
                Healthcare: [
                    {
                        itemName: "Health Check-up",
                        description: "Annual preventive health screening",
                        maxAmount: "Up to ₹10,000"
                    },
                    {
                        itemName: "Physiotherapy",
                        description: "Physical therapy sessions",
                        maxAmount: "Up to ₹5,000"
                    },
                    {
                        itemName: "Eye Care",
                        description: "Eye examination and prescription glasses",
                        maxAmount: "Up to ₹3,000"
                    },
                    {
                        itemName: "Dental Care",
                        description: "Preventive dental treatments",
                        maxAmount: "Up to ₹4,000"
                    },
                    {
                        itemName: "Massage Therapy",
                        description: "Therapeutic massage sessions",
                        maxAmount: "Up to ₹4,000"
                    }
                ],
                MentalHealth: [
                    {
                        itemName: "Counseling Sessions",
                        description: "Professional mental health counseling",
                        maxAmount: "Up to ₹10,000"
                    },
                    {
                        itemName: "Meditation App Subscription",
                        description: "Apps like Headspace, Calm, etc.",
                        maxAmount: "Up to ₹2,000"
                    },
                    {
                        itemName: "Stress Management Programs",
                        description: "Workshops and courses",
                        maxAmount: "Up to ₹5,000"
                    },
                    {
                        itemName: "Mindfulness Training",
                        description: "Professional mindfulness coaching",
                        maxAmount: "Up to ₹4,000"
                    }
                ],
                Nutrition: [
                    {
                        itemName: "Nutrition Consultation",
                        description: "Professional dietitian consultation",
                        maxAmount: "Up to ₹3,500"
                    },
                    {
                        itemName: "Meal Planning Services",
                        description: "Customized meal plans",
                        maxAmount: "Up to ₹3,000"
                    },
                    {
                        itemName: "Health Supplements",
                        description: "Vitamins and prescribed supplements",
                        maxAmount: "Up to ₹2,500"
                    }
                ],
                WorkLife: [
                    {
                        itemName: "Ergonomic Equipment",
                        description: "Chair, standing desk, keyboard",
                        maxAmount: "Up to ₹8,000"
                    },
                    {
                        itemName: "Childcare Support",
                        description: "Daycare or babysitting services",
                        maxAmount: "Up to ₹6,000"
                    },
                    {
                        itemName: "Elder Care Services",
                        description: "Support for elderly family members",
                        maxAmount: "Up to ₹5,000"
                    },
                    {
                        itemName: "Hobby Classes",
                        description: "Art, music, dance, or craft classes",
                        maxAmount: "Up to ₹3,000"
                    }
                ]
            };

            var oModel = new JSONModel(oEligibleItemsData);
            this.getView().setModel(oModel, "eligibleItems");
        },

        onNavBack: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Tod");
        }
    });
});

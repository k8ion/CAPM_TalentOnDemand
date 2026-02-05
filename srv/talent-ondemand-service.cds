using {deloitteTod.model.db as tod} from '../db/tod-model';

service TalentOnDemandService @(path: '/odata/v4/my') {
    entity Employees          as projection on tod.Employee;
    entity WellBeingSubsidies as projection on tod.WellBeingSubsidy;
    entity WellbeingProduct   as projection on tod.WellbeingProduct;
    entity PTO                as projection on tod.PTO;


    function getWellBeingRemaining() returns {
        userId    : String(50);
        currency  : String(5);
        total     : Decimal(15, 2);
        spent     : Decimal(15, 2);
        remaining : Decimal(15, 2);
    };

    function getPTOHours()           returns {
        userId                 : String(50);
        overallRemainingHrs    : Decimal(9, 1);
        privilegeRemainingHrs  : Decimal(9, 1);
        casualSickRemainingHrs : Decimal(9, 1);
    };
}


// entity Holidays                 as projection on tod.Holiday;
// entity PTOs                     as projection on tod.PTO;
// entity Expenses                 as projection on tod.Expense;
// entity DevelopmentPlans         as projection on tod.DevelopmentPlan;
// entity InsuranceBenefitRequests as projection on tod.InsuranceBenefitRequest;
// entity Compensations            as projection on tod.Compensation;
// entity Educations               as projection on tod.Education;
// entity Skills                   as projection on tod.Skill;
// entity Languages                as projection on tod.Language;
// entity PerformanceReviews       as projection on tod.PerformanceReview;
// entity CoachInformations        as projection on tod.CoachInformation;
// entity ResourceAssignments      as projection on tod.ResourceAssignment;
// entity ResourceManagers         as projection on tod.resourceManager;

using {
  cuid,
  managed
} from '@sap/cds/common';

namespace deloitteTod.model.db;

//Employee id
entity Employee : cuid, managed {
  UserId         : String(50);
  firstName      : String(50);
  lastName       : String(50);
  email          : String(100);
  region         : String(30);
  businessUnit   : String(50);
  contactDetails : String(100);
}

//Wellbeing
entity WellBeingSubsidy : cuid, managed {
  employee    : Association to Employee;
  totalAmount : Decimal(15, 2) default 25000.00;
  spentAmount : Decimal(15, 2) default 0.00;
  currency    : String(5) default 'INR';
  products    : Composition of many WellbeingProduct
                  on products.subsidy = $self;
}

entity WellbeingProduct : cuid, managed {
  subsidy     : Association to WellBeingSubsidy;
  productID   : String(10);
  productName : String(100);
  description : String(500);
  vendor      : String(100);
  amount      : Decimal(15, 2);
  receiptDate : Date;
}

// PTO
entity PTO : cuid, managed {
  employee               : Association to Employee;
  overallRemainingHrs    : Decimal(9, 1);
  privilegeRemainingHrs  : Decimal(9, 1);
  casualSickRemainingHrs : Decimal(9, 1);
}

// Holidays
entity Holiday : cuid, managed {
  region      : String(40);
  holidayName : String(60);
  date        : Date;
  description : String(120);
}

// Expense
entity Expense : cuid, managed {
  employee    : Association to Employee;
  category    : String(30);
  amount      : Decimal(10, 2);
  expenseDate : Date;
  description : String(120);
  status      : String(20);
  submittedAt : DateTime;
}

entity DevelopmentPlan : cuid, managed {
  employee   : Association to Employee;
  planYear   : Integer;
  objectives : String(150);
  items      : Composition of many DevelopmentPlanItem
                 on items.plan = $self;
}

entity DevelopmentPlanItem : cuid, managed {
  plan        : Association to DevelopmentPlan;
  title       : String(100);
  description : String(255);
  status      : String(20); // ('Completed', 'Enrolled', 'Not Enrolled')
  type        : String(20); // ('Experience', 'Exposure', or other future types)
}


entity InsuranceBenefitRequest : cuid, managed {
  employee                         : Association to Employee;
  benefitType                      : String(50);
  dependentChange                  : Boolean default false;
  description                      : String(255);
  status                           : String(20);
  medicalCoverageAmount            : Decimal(15, 2);
  medicalCoverageCurrency          : String(5);
  personalAccidentCoverageAmount   : Decimal(15, 2);
  personalAccidentCoverageCurrency : String(5);
  groupLifeCoverageAmount          : Decimal(15, 2);
  groupLifeCoverageCurrency        : String(5);
}

// Compensation
entity Compensation : cuid, managed {
  employee   : Association to Employee;
  compType   : String(40);
  period     : String(20);
  amount     : Decimal(12, 2);
  currency   : String(5);
  paySlip    : String(100);
  payDate    : Date;
  statement  : String(255);
  baseSalary : String(255);
}

// Performance, Coaching & Development
entity PerformanceReview : cuid, managed {
  employee         : Association to Employee;
  coachInformation : Association to CoachInformation;
  period           : String(10);
  reviewer         : String(100);
  overallRating    : String(15);
  feedback         : String(255);
}

entity CoachInformation : cuid, managed {
  employee  : Association to Employee;
  coachName : String(100);
}

// Resource Management & Assignment
entity ResourceAssignment : cuid, managed {
  employee       : Association to Employee;
  projectName    : String(100);
  resouceManager : Association to resourceManager;
  businessUnit   : String(50);
  startDate      : Date;
  endDate        : Date;
  status         : String(15);
}

entity resourceManager : cuid, managed {
  employee    : Association to Employee;
  managerName : String(100);
}

// Education/Skill/Language—Career Data
entity Education : cuid, managed {
  employee      : Association to Employee;
  degree        : String(80);
  institution   : String(80);
  yearCompleted : Integer;
}

entity Skill : cuid, managed {
  employee    : Association to Employee;
  name        : String(60);
  proficiency : String(15);
}

entity Language : cuid, managed {
  employee    : Association to Employee;
  name        : String(40);
  proficiency : String(10);
}

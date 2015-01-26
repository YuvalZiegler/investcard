'use strict';


let cards = [
      {
            id:1,
            companyTitle:"Los Pollos Hermanos",
            companyExcerpt: "New Mexico fried chicken",
            companyDescription: "The finest ingredients are brought together with love and care, then slow cooked to perfection.",
            companyLogo: "./images/tech1.jpeg",
            fundingGoal:100000,
            fundingStart: "Jan 16, 2015",
            timeFromNow:"about 24 hours from now",
            investors:15,
            currentUserContribution:0,
            currentFunds:40000,
            status:"PENDING"
      },
      {
            id:2,
            companyTitle:"Madrigal Elektromotoren",
            companyExcerpt: "Shipping conglomerate",
            companyDescription: "multifaceted conglomerate headquartered in Hannover",
            companyLogo: "./images/tech2.jpeg",
            fundingGoal:150000,
            fundingStart: "Jan 16, 2015",
            timeFromNow:"about 24 hours from now",
            investors:0,
            currentUserContribution:0,
            currentFunds:0,
            status:"PENDING"
      },
      {
            id:3,
            companyTitle:"Saul Goodman & Associates",
            companyExcerpt: "Better Call Saul!",
            companyDescription: "We practice law, practice makes perfect.",
            companyLogo: "./images/tech3.jpeg",
            fundingGoal:200000,
            fundingStart: "Jan 17, 2015",
            timeFromNow:"about 48 hours from now",
            investors:3,
            currentUserContribution:0,
            currentFunds:10000,
            status:"PENDING"
      }
];

module.exports = {
    cards:cards
};



'use strict';
var moment = require('moment');
var cards = [
  {
    id:1,
    company:"ACME Corporation",
    companyExcerpt: "Explosive tennis balls for all",
    companyDescription: "The Acme Corporation is a fictional corporation featuring outlandish products that fail or backfire catastrophically at the worst possible times.",
    companyLogo: "./images/logo.png",
    fundingGoal:"100000",
    fundingStart:moment().add(1, 'days').fromNow()
  }
];

module.exports = cards;



var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');

exports.config = {
  directConnect: false,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumAddress: 'http://ec2-34-213-66-164.us-west-2.compute.amazonaws.com:4446/wd/hub',
  // Capabilities to be passed to the webdriver instance.

  capabilities: {
    browserName: 'firefox',
    // chromeOptions: {
    //   args: [ "--headless", "--disable-gpu", "--window-size=800x600" ]
    // }
  },

  // Parallel Execution
  // multiCapabilities:  [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  //   //  }, {
  //   //   browserName: 'internet explorer',
  // }],

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../test/*.spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
	showColors: true,
    defaultTimeoutInterval: 30000
  },
  
  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'target/screenshots'
      })
    );
 },
 onPrepare: function() {
  jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
  consolidateAll: true,
  savePath: './target',
  filePrefix: 'xmlresults'
}))},

onComplete: function() {
  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

  capsPromise.then(function (caps) {
     browserName = caps.get('browserName');
     browserVersion = caps.get('version');

     var HTMLReport = require('protractor-html-reporter');

     testConfig = {
         reportTitle: 'EPMC Protractor Demo - Execution Report',
         outputPath: './target',
         screenshotPath: './target/screenshots',
         testBrowser: browserName,
         browserVersion: browserVersion,
         modifiedSuiteName: false,
         screenshotsOnlyOnFailure: false
     };
     new HTMLReport().from('./target/xmlresults.xml', testConfig);
 })},
};

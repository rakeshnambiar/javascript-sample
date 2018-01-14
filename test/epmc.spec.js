
var fs = require('fs');
const frisby = require('frisby');
const Joi = frisby.Joi;

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

function callRestApi() {
    try{
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.ebi.ac.uk/europepmc/annotations_api/annotationsByProvider?provider=IntAct&filter=1&format=JSON&pageSize=4", false);
        xhr.send();

        console.log(xhr.status);
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log('-------------------------------')
        console.log(response.articles.length);
        console.log('-------------------------------')
        console.log(response.articles[0].annotations);
    } catch(error)    {
        throw ("Error while hiting the Web Service");
    }
}

describe ("Verify the EPMC Search functionality", function() {
    var home_page = require('../pages/home_page.js');
    var searchTerms = {pmid: "EXT_ID:25713560", pmcid : "PMC4322841", keyword : "blood"}

    beforeAll(function () {
		console.log('---------Test(s) Started---------')
		browser.waitForAngularEnabled(false);
	});
	
	afterAll(function() {
		console.log('---------Test(s) Finished---------')		
	});

	beforeEach(function () {
        console.log('-- Calling new Test --')
        //browser.driver.manage().window().maximize();
        browser.get('http://www.europepmc.org/');
        expect(home_page.isSearchButtonDisplayed()).toBe(true);
      });
      

    //tests
    it("Search By PMCID", function() {
        //await browser.get('http://www.europepmc.org/');
        let article_page = home_page.performUniqueSearch(searchTerms.pmcid); 
        expect(article_page.getResultFoundText()).toContain('result found');
    });

    it("Search By EXT_ID", function() {
        let article_page = home_page.performUniqueSearch(searchTerms.pmid); 
        expect(article_page.getResultFoundText()).toContain('result found');
    });

    it("Search By term/keyword and select an item from the Results page", function() {
        let results_page = home_page.performSearch(searchTerms.keyword); 
        expect(results_page.isSearchResultsPageLoaded()).toBe(true);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, './target/search_results.png');
        });
        let article_page = results_page.selectAnItem(5);
        expect(article_page.isTitleDisplayed()).toBe(true);
    });
});

describe ("Verify the Annotation API directly from JavaScript", function() {
        let response;
        beforeAll(function(){
            let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://www.ebi.ac.uk/europepmc/annotations_api/annotationsByProvider?provider=IntAct&filter=1&format=JSON&pageSize=4", false);
            xhr.send();
        
            console.log(xhr.status);
            response = JSON.parse(xhr.responseText);
        });

        it("Verify the response available", function(){
            console.log("------Verify the Annotation API directly from JavaScript----");
            console.log(response);
        });
});

describe("Annoation API from Frisby.Js", function(){
    it("Verify the response available",function(done){
        console.log("------Verify the Annotation API through Frisby.JS----");
        let pageSize = 4;
        frisby.get('https://www.ebi.ac.uk/europepmc/annotations_api/annotationsByProvider?provider=IntAct&filter=1&format=JSON&pageSize='+pageSize)
            .expect('status', 200)
            .then(function(json){
                console.log(json._body);
                expect(json._body.articles[0].source).toBe("MED")
                expect(json._body.articles.length).toBe(pageSize)               
            })
        .done(done);      
    });
});
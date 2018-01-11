
var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

function callRestApi() {
    try{
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.ebi.ac.uk/europepmc/annotations_api/annotationsByProvider?provider=IntAct&filter=1&format=JSON&pageSize=4", false);
        xhr.send();

        console.log(xhr.status);
        var response = JSON.parse(xhr.responseText);
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
        browser.driver.manage().window().maximize();
        browser.get('http://www.europepmc.org/');
        expect(home_page.isSearchButtonDisplayed()).toBe(true);
      });
      

    //tests
    it("Search By PMCID", function() {
        var article_page = home_page.performUniqueSearch(searchTerms.pmcid); 
        expect(article_page.getResultFoundText()).toContain('result found');
    });

    it("Search By EXT_ID", function() {
        var article_page = home_page.performUniqueSearch(searchTerms.pmid); 
        expect(article_page.getResultFoundText()).toContain('result found');
    });

    it("Search By term/keyword and select an item from the Results page", function() {
        var results_page = home_page.performSearch(searchTerms.keyword); 
        expect(results_page.isSearchResultsPageLoaded()).toBe(true);
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'target/search_results.png');
        });
        var article_page = results_page.selectAnItem(5);
        expect(article_page.isTitleDisplayed()).toBe(true);
    });
});

// describe ("Verify the Annotation API", function() {
//     var response;
//     beforeAll(function(){
//         var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", "https://www.ebi.ac.uk/europepmc/annotations_api/annotationsByProvider?provider=IntAct&filter=1&format=JSON&pageSize=4", false);
//         xhr.send();
    
//         console.log(xhr.status);
//         response = JSON.parse(xhr.responseText);
//     });

//     it("Verify the No. of articles are 4", function(){
//         console.log(response);
//     });
// });
var article_page = require('../pages/article_page.js');

var search_resultspage = function() {
    this.isSearchResultsPageLoaded = function() {
        return element(by.css('h2')).isPresent();
    };

    this.selectAnItem = function(index) {
        try{
            element.all(by.css('span.results_list_citation_title.citation-title')).then(function(results) {
                results.forEach(function (element) {
                    element.getText().then(function(text){
                        console.log(" - " + text + "\n");
                    });
                });
                results[index].click();     
            });
        } catch(error)     {
            throw ("Error while selecting the Result item no - " + index);
        }
        return article_page;
    };
};
module.exports = new search_resultspage();
var article_page = require('../pages/article_page.js');
var results_page = require('../pages/search_results_page.js');

var home_page = function () {
    var searchButton = element(by.id('banner--search-button'));
    var searchTextBox = element(by.id('banner--search-input'));

    this.isSearchButtonDisplayed =  function() {
        return searchButton.isPresent();
    };

    this.performUniqueSearch = function(keyword) {
        try{
            searchTextBox.sendKeys(keyword);
            searchButton.click();
        } catch(error){
            throw ("Error while peforming performUniqueSearch - "+ keyword);
        }    
        return article_page;
    };

    this.performSearch = function(keyword) {
        try{
            searchTextBox.sendKeys(keyword);
            searchButton.click();
        } catch(error) {
            throw ("Error while peforming performSearch - "+ keyword);
        }    
        return results_page;
    };

};
module.exports = new home_page();

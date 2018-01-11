var article_page = require('../pages/article_page.js');
var results_page = require('../pages/search_results_page.js');

var home_page = function () {
    
    this.isSearchButtonDisplayed =  function() {
        return element(by.id('banner--search-button')).isPresent();
    };

    this.performUniqueSearch = function(keyword) {
        try{
            element(by.id('banner--search-input')).sendKeys(keyword);
            element(by.id('banner--search-button')).click();
        } catch(error){
            throw ("Error while peforming performUniqueSearch - "+ keyword);
        }    
        return article_page;
    };

    this.performSearch = function(keyword) {
        try{
            element(by.id('banner--search-input')).sendKeys(keyword);
            element(by.id('banner--search-button')).click();
        } catch(error) {
            throw ("Error while peforming performSearch - "+ keyword);
        }    
        return results_page;
    };

};
module.exports = new home_page();

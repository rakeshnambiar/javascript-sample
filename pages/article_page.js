
var article_page = function() {

    this.getResultFoundText = function() {
        return element(by.css('div.return_to_search_results')).getText();
    };

    this.isTitleDisplayed = function() {
        return element(by.css('h1.title')).isPresent();
    };
};
module.exports = new article_page();
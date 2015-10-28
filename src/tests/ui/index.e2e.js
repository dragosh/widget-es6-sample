/**
* ------------------------------------------------------------------------
* Main UI test file
* ------------------------------------------------------------------------
*/

describe('webdriver.io page', () => {
    it('should have the right title - the fancy generator way', function *() {
        yield browser.url('/')
        let title = yield browser.getTitle()
        expect(title).toBe('Widget ES2015 - full-spectrummmmm')
    })
})

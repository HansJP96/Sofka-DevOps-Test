var webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome')
capabilities = process.env.USE_CHROME ? 'chrome' : 'phantomjs';

module.exports = function () {
  if (capabilities === 'phantomjs') {
    return new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities[capabilities]())
      .build();
  }

  var options = new chrome.Options();
  if (!process.env.SHOW_CHROME) {
    options.addArguments('headless')
    options.addArguments('disable-gpu')
    options.addArguments('ignore-certificate-errors')
    options.addArguments('disable-popup-blocking')
  }

  return process.env.USE_GRID ?
    new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities[capabilities]())
      .setChromeOptions(options)
      .usingServer('http://localhost:4444/wd/hub')
      .build() :
    new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities[capabilities]())
      .setChromeOptions(options)
      .build()
}

const cheerio = require('cheerio')
const puppeteer = require('puppeteer');

console.log('waitForSelector')
async function fetchData(year = '109', month = '6', cb = function(){}) {
  try {
    await page.waitForSelector('#D539Control_history1_radYM')
    await page.click('#D539Control_history1_radYM')
    await page.type('#D539Control_history1_dropYear', year)
    await page.type('#D539Control_history1_dropMonth', month)
    await page.click('#D539Control_history1_btnSubmit')
    await page.waitForNavigation({
      timeout: 0
    })
    await page.screenshot({path: 'example.png'})
    const content = await page.content()
    await browser.close();
    const $ = cheerio.load(content)
    cb($)

    return $
  } catch (error) {
    console.error(error)
  }

}


module.exports = fetchData

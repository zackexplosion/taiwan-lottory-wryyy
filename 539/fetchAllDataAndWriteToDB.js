const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const db = require('./db')


const YEARS = [
  '109',
  '108',
  '107',
  '106',
  '105',
  '104',
  '103',
]

const MONTHS = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10', '11', '12'].reverse()

// const fetchData = require('./fetchData')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchData(year = '109', month = '6', page) {
  await page.waitForSelector('#D539Control_history1_radYM')
  await page.click('#D539Control_history1_radYM')
  await page.select('#D539Control_history1_dropYear', year)
  await page.select('#D539Control_history1_dropMonth', month)
  await page.click('#D539Control_history1_btnSubmit')
  await page.waitForNavigation({
    timeout: 0
  })
  // await page.screenshot({path: 'example.png'})
  const content = await page.content()
  const $ = cheerio.load(content)
  return $
}


;(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://www.taiwanlottery.com.tw/lotto/dailycash/history.aspx')
  for(i in YEARS){
    var y = YEARS[i]
    for(j in MONTHS) {
      var m = MONTHS[j]
      console.log('fetching', y, m)
      try {
        const $ = await fetchData(y, m, page)
        console.log('sleeping')
        await sleep(500)
        toDB($)
      } catch (error) {
        console.error(error)
      }
    }
  }
  // const $ = await fetchData('108', '1', page)
  // console.log('sleeping')
  // await sleep(5000)
  // toDB($)
  await browser.close();
})()

function toDB($) {
  $('.td_hm').each((i, v) => {
    let id = $(v).find('tr:nth-child(2) td span').html()
    let d = $(v).find('tr:nth-child(2) > td:nth-child(2) > span span').html()
    const numbers = []
    $(v)
      .find('tr:nth-child(3) .font_black14b_center span')
      .each((i, v) => {
      let n = $(v).html()
      numbers.push(n)
    })
    const r = {
      id, d, numbers
    }
    console.log(r)
    db.get('dailycash')
    .push(r)
    .write()
  })
}

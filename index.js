const puppeteer = require('puppeteer');
const Sheet = require('./sheet');

(async function () {
    if(process.argv.length !== 3){
        console.log('Please provide an url for scraping as command line argument!');
        return 1;
    }
    let url = process.argv[2];
    const browser = await puppeteer.launch({defaultViewport: null, headless: true});
    const page = await browser.newPage()
    await page.goto(url,{ waitUntil: 'networkidle0' ,timeout: 90000});

    // TODO: Expand all comment threads
    let expandButton = await page.$$('.morecomments');
    while (expandButton.length) {
        for (let button of expandButton) {
            await button.click().catch(async e => {

                // TODO: Removing elements from the DOM
                await page.evaluate(e =>{
                    e.parentNode.removeChild(e);
                },button)
            });
            await page.waitFor(500);
        }
        await page.waitFor(1000);
        expandButton = await page.$$('.morecomments');
        console.log(expandButton.length);
    }

    // TODO: Select all comments, scrape text and points
    let comments = await page.$$('div.entry.unvoted');
    let formattedComments = [];
    for (let comment of comments) {
        const rawText = await comment.$eval('.md p', el => el.textContent).catch(e => console.error('no'));
        const points = await comment.$eval('.score', el => el.textContent).catch(e => console.error('no score'));
        if(rawText&&points){
            text = rawText.replace(/\n/g, '');
            formattedComments.push({points, text});
        }
        
    }
    

    // TODO: Sort comments by points

    formattedComments.sort((a, b) =>{
        pointsA = a.points.split(' ')[0];
        if (pointsA.includes('k')) {
            pointsA = pointsA.replace('k','');
            pointsA = Number(a)*1000;
        }
        pointsB = b.points.split(' ')[0];
        if (pointsB.includes('k')) {
            pointsB = pointsB.replace('k','');
            pointsB = Number(b)*1000;
        }
        return pointsB - pointsA;
    })

    console.log(formattedComments.slice(0,10));

    // TODO: Create sheet with title
    const sheet = new Sheet();
    let info = await sheet.load();

    const title = await page.$eval('.title a', el => el.textContent);
    
    let sheetIndex, sheetIndex1;
    sheetIndex = await sheet.addSheets(title.slice(0,99), ['points', 'text']).catch(async e => {
        let i;
        info.forEach(e => {
            if(e._rawProperties.title.includes(title.slice(0,99))){
                i = e._rawProperties.index;
            }
        })
        // TODO: Deleteing existing duplicate sheet
        await sheet.delete(i);

        await sheet.load();
        // TODO: Creating new sheet
        sheetIndex1 = await sheet.addSheets(title.slice(0,99), ['points', 'text'])
        
    });


    // TODO: Insert into google sheet
    if (sheetIndex1) {
        console.log({sheetIndex1});
        await sheet.addRows(formattedComments, sheetIndex1);
    } else{
        console.log({sheetIndex});
        await sheet.addRows(formattedComments, sheetIndex);
    }
    await browser.close();

    



    
})()
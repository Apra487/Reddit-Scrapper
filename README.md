# Reddit Scraper

This is a Reddit scraper that can scrape any Subreddit.

Written in JavaScript using puppeteer.

## Installation

To use this program, we need to perform this installatiion process once

-   Clone or download this repo.

```bash
git clone https://github.com/Apra487/Reddit-Scrapper.git
cd Reddit-Scrapper
```

-   Download and install [Node.js](https://nodejs.org/en/)
-   Create a service account on [Google Cloud Platform](https://cloud.google.com/gcp/). Don't worry it's free!
-   Generate credentials for your newly created service account.You should get a json file containing all the private credentials.
-   Rename the json file to `credentials.json`
-   Move `credentials.json` to the root of the project folder.
-   Create an empty `Google Sheet`.
-   Share the newly created Google Sheet with newly created service account and give write acess.
-   Copy the sheet id from the url.

```bash
https://docs.google.com/spreadsheets/d/<YOUR SHEET ID>/edit#gid=0
```

-   Paste the copied sheet id inplace of `<Goggle sheet ID>` in line no 5 on sheet.js

```bash
this.doc = new GoogleSpreadsheet('<Goggle sheet ID>');
```

-   Install all the dependencies.

```bash
npm install
```

## Usage

So you're done with the installation. But, how do you use it?
<br>

-   Execute `index.js` with an url as argument by running the following command.

### Example

```bash
node index.js https://www.old.reddit.com/r/nextfuckinglevel/comments/j90u9d/this_happened_today_in_new_zealand_no_social/
```

<br>
NOTE :: This works only with old reddit url.

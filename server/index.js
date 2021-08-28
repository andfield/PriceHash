/*
    This is the https server.
    - import required dependencies 
    - create express server
    - configure a port to host server on.
    - load all the middleware.
    - start the serve.
*/

import logger from 'morgan'
import express from 'express';
import cron from 'node-cron';

import {
    getHTML,
    scrapPrice,
    currencyStringToNumber,
    links,
    desiredPrice,
} from './helpers/Scrapper.js'


const server = express();

const PORT = process.env.PORT || 3001;
server.set('port', PORT);

server.use(logger('dev'));

//scheduler.
cron.schedule('0 * * * *', async () => {
    console.log('Scrapping every hour');
    const html = await getHTML(links).catch(console.log);
    const currentPrice = currencyStringToNumber(scrapPrice(html));
    if(currentPrice < desiredPrice){
        console.log("yay sheeit works.");
    }
})

server.listen(PORT, () => {
    console.log(`Server started on por ${PORT}`)
    
});
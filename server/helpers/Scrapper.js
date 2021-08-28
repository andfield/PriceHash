/*
    - Import sheeit thats required.
    - All the links to scrape.
    - Axios request to get the desired page.
    - Use Cheerio to actually scrape data using the html page.
    - If the price retured is currency string '$ 100' then use a currency converter.
    - use a node scheduler to re-run the scrape every hour or so.
*/

import axios from "axios";
import cheerio from 'cheerio'

const links = 'https://www.cyberpuerta.mx/Computo-Hardware/Monitores/Monitores/Monitor-Gamer-Curvo-ASUS-ROG-Strix-XG35VQ-LED-35-Quad-HD-Ultra-Wide-FreeSync-100Hz-HDMI-Negro-Gris-Rojo.html?nosto=shop_api_home0_1';
const selector = '.priceText'
const desiredPrice = 15000;

//Function to get html of the page.
async function getHTML(url){
    const {data} = await axios.get(url).catch((error) => {
        console.log(error);
    })
    return data;
}

//Fucntion to scrape price.
function scrapPrice(html) {
    const $ = cheerio.load(html);
    const price = $(selector)
      .text()
      .trim();
    return price;
  }

//Currency String to a number.
const currencyStringToNumber = (priceString) => Number(priceString.replace(/[^0-9.-]+/g, ''));

export {
    getHTML,
    scrapPrice,
    currencyStringToNumber,
    links,
    desiredPrice,
}
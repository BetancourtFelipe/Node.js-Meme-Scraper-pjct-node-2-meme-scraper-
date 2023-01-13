import { createWriteStream } from 'node:fs';
import $ from 'cheerio';
import fetch from 'node-fetch';

// define URL
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// fetch html

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((body) => {
    for (let i = 0; i < 10; i++) {
      const currentImg = $('img', body)[i].attribs.src;

      fetch(currentImg).then((res) => {
        const path =
          './memes/' + currentImg.split('?')[0].split('/').slice(4).join('_');

        const dest = createWriteStream(path);
        res.body.pipe(dest);
      });
    }

    console.log('Images downloaded');
  });

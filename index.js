const puppeteer = require('puppeteer');
const readLineSync = require('readline-sync')

console.log('-- Conversor metrico --');

async function robo(){
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();
    const valor = readLineSync.question('Informe a distancia: ') || 1;
    const unidade1 = readLineSync.question('Informe a primeira unidade de distancia: ') || 'km';
    const unidade2 = readLineSync.question('Informe a segunda unidade de distancia: ') || 'metros';
    const urlBase = `https://www.google.com/search?q=${valor}+${unidade1}+para+${unidade2}&rlz=1C1GCEU_pt-BRBR848BR848&oq=${valor}&aqs=chrome..69i57j0l7.9716j1j7&sourceid=chrome&ie=UTF-8`;
    await page.goto(urlBase);
    const resultado = await page.evaluate(() => {
        return document.querySelectorAll('.vXQmIe')[1].value;
    });
    console.log(`O valor da conversão de ${valor} ${unidade1} em ${unidade2} é: ${resultado} ${unidade2}`)
    await browser.close();
}
robo();
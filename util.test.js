const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
    const text = generateText('Arli', 29);
    expect(text).toBe('Arli (29 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBeNull;
})

test('should output empty string and null text', () => {
    const text = generateText('', null);
    expect(text).toBe(" (null years old)");
})

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Arli', 29);
    expect(text).toBe('Arli (29 years old)');
})

test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 80,
        args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage();
    await page.goto(
        'file:///home/ooforomeh/Downloads/original/testing-02-unit-tests/index.html'
    );

    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '29');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (29 years old)');
},  10000);
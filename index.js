const cheerio = require('cheerio');
const got = require('got');
var fs = require('fs');

//const trackerList = require('./config');
let trackerList = {
    "unboxedPhone": "https://www.2gud.com/2gud/mobiles/mobile-refurbished/pr?facets=&p%5B%5D=facets.internal_storage%255B%255D%3D128%2B-%2B255.9%2BGB&pathname=%2F2gud%2Fmobiles%2Fmobile-refurbished%2Fpr&pincode=&sid=2gd%2Ckns%2Cfht&sort=price_asc&splat=2gud%2Fmobiles%2Fmobile-refurbished&store=2gd%2Ckns%2Cfht&p%5B%5D=facets.internal_storage%255B%255D%3D256%2BGB%2B%2526%2BAbove&p%5B%5D=facets.brand%255B%255D%3DRealme&p%5B%5D=facets.brand%255B%255D%3DRealMe&p%5B%5D=facets.brand%255B%255D%3DPOCO&p%5B%5D=facets.brand%255B%255D%3DMi&p%5B%5D=facets.brand%255B%255D%3DLG&p%5B%5D=facets.brand%255B%255D%3DOnePlus&p%5B%5D=facets.ram%255B%255D%3D6%2BGB%2B%2526%2BAbove&p%5B%5D=facets.ram%255B%255D%3D4%2BGB&p%5B%5D=facets.grade_id%255B%255D%3DU",
    "refurbished": "https://www.2gud.com/2gud/mobiles/mobile-refurbished/pr?facets=&p%5B%5D=facets.internal_storage%255B%255D%3D128%2B-%2B255.9%2BGB&pathname=%2F2gud%2Fmobiles%2Fmobile-refurbished%2Fpr&pincode=&sid=2gd%2Ckns%2Cfht&sort=price_asc&splat=2gud%2Fmobiles%2Fmobile-refurbished&store=2gd%2Ckns%2Cfht&p%5B%5D=facets.internal_storage%255B%255D%3D256%2BGB%2B%2526%2BAbove&p%5B%5D=facets.brand%255B%255D%3DRealme&p%5B%5D=facets.brand%255B%255D%3DRealMe&p%5B%5D=facets.brand%255B%255D%3DPOCO&p%5B%5D=facets.brand%255B%255D%3DMi&p%5B%5D=facets.brand%255B%255D%3DLG&p%5B%5D=facets.brand%255B%255D%3DOnePlus&p%5B%5D=facets.ram%255B%255D%3D6%2BGB%2B%2526%2BAbove&p%5B%5D=facets.ram%255B%255D%3D4%2BGB&p%5B%5D",
};

(async () => {
    let phoneName = 'Realme X (Space Blue, 128 GB)';
    let searchIn = trackerList['unboxedPhone'];
    let allProducts = await getProducts(searchIn).catch(e => [])
    let filteredProduct = allProducts.filter((v) => {
        if (v.phoneName.includes(phoneName))
            return v;
    })
    console.log(JSON.stringify(filteredProduct, '', 2));
})()





async function getProducts(link) {
    let productList = [];
    //    let { body } = await got(link).catch(e => null);
    let body = fs.readFileSync('input.txt', 'utf8')
    /*
     fs.writeFileSync('ainput.txt', body, 'utf8')
    */
    if (body) {
        productList = parseData(body)
    }
    return productList;
}

function parseData(body) {
    const $ = cheerio.load(body);
    let namePriceList = []
    const phoneName = [];
    $('a._2cLu-l').each(function (i, elem) {
        phoneName[i] = $(this).text();
    });
    const phonePrice = [];
    $('div._1vC4OE').each(function (i, elem) {
        phonePrice[i] = $(this).text();
    });
    if (phonePrice.length > 0 && phoneName.length === phonePrice.length) {
        namePriceList = phoneName.reduce((a, c, i) => {
            a.push({ phoneName: c, phonePrice: phonePrice[i] })
            return a;
        }, [])
    }
    return namePriceList;
}
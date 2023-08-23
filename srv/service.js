const cds = require('@sap/cds');
const textBundle = require(`./handlers/textBundle`);

module.exports = srv => {
    const {VechicleData} = srv.entities("ElectricVechicle");

    srv.on('getNoRecords', async () => {
        let oQuery = SELECT.from(VechicleData).columns(`count(VIN) as noRows`);
        return await cds.run(oQuery);
    })

    srv.on('getNoCarsViaMake', async req => {
        const locale = req.user.locale;
        const bundle = textBundle.getTextBundle(locale);
        const sMake = req.data.make;
        if(!sMake) {
            req.error(406, bundle.getText("fillData"));
        }
        let oQuery = SELECT.from(VechicleData).columns(`count(VIN) as noRows`).where({Make:`${sMake.toUpperCase()}`});
        return await cds.run(oQuery);
    })

    srv.on('getCarsMake', async () => {
        const oQuery = SELECT.distinct.from(VechicleData).columns("Make as brand", "count(1) as quantity").groupBy(`Make`).orderBy(`quantity`);
        return await cds.run(oQuery);
    })

    srv.on(`getUniqueModels`, async () => {
        const oQuery = SELECT.distinct.from(VechicleData).columns('Make as brand',`Model as type`, 'count(Model) as quantity').groupBy(`Model`).orderBy(`brand`) ;
        return await cds.run(oQuery);
    })

    srv.on('getCarsInYear', async req => {
        const locale = req.user.locale;
        const bundle = textBundle.getTextBundle(locale);
        const oYear = req.data.year;
        if(!oYear) {
            req.error(406, bundle.getText("fillData"));
        }
        const oQuery = SELECT.from(VechicleData).columns(`count(VIN)`).where({Model_year: oYear});
        return await cds.run(oQuery);
    })

    srv.on(`getNewestCar`, async () => {
        const oQuery = SELECT.from(VechicleData).columns(`Make as brand`, `Model as model`, `Model_year as year`).orderBy({Model_year: `desc`});
        return await cds.run(oQuery);
    })

    srv.on(`getOldestCar`, async () => {
        const oQuery = SELECT.from(VechicleData).columns(`Make as brand`, `Model as model`, `Model_year as year`).orderBy({Model_year: `asc`});
        return await cds.run(oQuery);
    })

    srv.on(`getMostPopularCar`, async () =>{
        const oQuery = SELECT.from(VechicleData).columns(`Make as brand`, `Model as type`, `count(Model) as quantity`).groupBy(`Model`).orderBy(`quantity desc`);
        return await cds.run(oQuery);
    })
}
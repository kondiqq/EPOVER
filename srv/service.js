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
        if(!req.data.make) {
            req.error(406, bundle.getText("fillData"));
            return;
        }
        const sMake = req.data.make;
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
        if(!req.data.year) {
            req.error(406, bundle.getText("fillData"));
            return;
        }
        const oYear = req.data.year;
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

    srv.on(`getAverageDistance`, async () =>  {
        const oQuery = cds.parse.cql(`SELECT AVG(Range) as avgDistance from ${VechicleData}`);
        return await cds.run(oQuery);
    })

    srv.on(`getEVTtype`, async () => {
        const oQuery = SELECT.distinct.from(VechicleData).columns(`EVT as type`, `count(EVT) as quantity`).groupBy(`EVT`).orderBy(`quantity`);
        return await cds.run(oQuery);
    })

    srv.on(`getLocation`, async () => {
        const oQuery = SELECT.distinct.from(VechicleData).columns(`County as count`, `City as city`,
        `State as state`, `Postal_code as postal_code`).limit(100);
        return cds.run(oQuery);
    })

    srv.on(`getUniqueCities`, async() => {
        const oQuery = SELECT.distinct.from(VechicleData).columns(`City as city`, `State as state`);
        return cds.run(oQuery);
    })

    srv.on(`getCitiesWithCarFromCounty`, async req => {
        const locale = req.user.locale;
        const bundle = textBundle.getTextBundle(locale);
        if(!req.data.county){
            req.error(406, bundle.getText("fillData"));
            return;
        }
        const oCounty = req.data.county;
        let oQuery = SELECT.distinct.from(VechicleData).columns(`City as city`, `Postal_code as postal_code`, `count(City) as quantity`).where({County: `${oCounty}`}).groupBy(`City`);
        return await cds.run(oQuery);
    })
}
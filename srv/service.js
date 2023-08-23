const cds = require('@sap/cds');


module.exports = srv => {
    const {VechicleData} = srv.entities("ElectricVechicle");

    srv.on('getNoRecords', async () => {
        let oQuery = SELECT.from(VechicleData).columns("count(VIN) as noRows");
        return await cds.run(oQuery);
    })

    srv.on('getNoCarsViaMake', async req => {
        const sMake = req.data.make;
        let oQuery = SELECT.from(VechicleData).columns("count(VIN) as noRows").where({Make:`${sMake.toUpperCase()}`});
        return await cds.run(oQuery);
    })

    srv.on('getCarsMake', async () => {
        let oQuery = SELECT.distinct.from(VechicleData).columns("Make as brand", "count(1) as quantity").groupBy(`Make`).orderBy(`quantity`);
        return await cds.run(oQuery);
    })

    srv.on('getCarsInYear', async req => {
        const oYear = req.data.year;
        let oQuery = SELECT.from(VechicleData).columns("count(VIN)").where({Model_year: oYear});
        return await cds.run(oQuery);
    })
}
using {electric_v as ev} from '../db/scheme';

service ElectricVechicle @(path: '/electric') {
    entity VechicleData as projection on ev.VechicleData;

    type carMake {
        brand           : String;
        quantity        : Integer;
        type           : String;
    }

    type modelNo {
        model   : String;
        quantity: Integer;
    }

    type yearLong {
        brand : String;
        model : String;
        year  : Integer;
    };

    type evtType {
        type : String;
        quantity: Integer;
    }

    type location {
        count       : String;
        city        : String;
        state       : String;
        postal_code : Integer;
        // counter     : Integer;
    }
    

    function getNoRecords() returns Integer;
    function getNoCarsViaMake(make: String) returns Integer;
    function getCarsMake() returns Array of carMake;
    function getUniqueModels() returns Array of String;
    function getCarsInYear(year: Integer) returns Integer;
    function getNewestCar() returns yearLong;
    function getOldestCar() returns yearLong;
    function getMostPopularCar() returns carMake;
    function getAverageDistance() returns Double;
    function getEVTtype() returns Array of evtType;
    function getLocation() returns array of location;
    function getUniqueCities() returns array of String;
    function getCitiesWithCarFromCounty(county: String) returns array of location;
    function printPdf() returns Integer;
    function generateJWT() returns String;
}
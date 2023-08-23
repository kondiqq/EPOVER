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
    

    function getNoRecords() returns Integer;
    function getNoCarsViaMake(make: String) returns Integer;
    function getCarsMake() returns Array of carMake;
    function getUniqueModels() returns Array of String;
    function getCarsInYear(year: Integer) returns Integer;
    function getNewestCar() returns yearLong;
    function getOldestCar() returns yearLong;
    function getMostPopularCar() returns carMake;
}
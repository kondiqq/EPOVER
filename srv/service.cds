using {electric_v as ev} from '../db/scheme';

service ElectricVechicle @(path: '/electric') {
    entity VechicleData as projection on ev.VechicleData;

    type carMake {
        brand           : String;
        quantity        : Integer
    }

    function getNoRecords() returns Integer;
    function getNoCarsViaMake(make: String) returns Integer;
    function getCarsMake() returns Array of carMake;
    function getCarsInYear(year: Integer) returns Integer;
}
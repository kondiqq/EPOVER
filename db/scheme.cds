namespace electric_v;

using {managed, cuid} from '@sap/cds/common';

entity VechicleData : cuid {
    VIN                  : String(10);
    County                 : String;
    City                    : String;
    State                   : String;
    Postal_code             : String;
    Model_year              : String;
    Make                    : String;
    Model                   : String;
    EVT                     : String;
    CAFV                    : String;
    Range                   : Integer;
    MSRP                    : Integer;
    Legislative_district    : Integer;
    DOL_Vehicle_ID          : Integer64;
    Vehicle_Location        : String;
    Electric_utility        : String;
    Census_Tract_2020      : Integer64;
}
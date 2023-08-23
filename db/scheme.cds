namespace electric_v;

using {managed, cuid} from '@sap/cds/common';

entity VechicleData : cuid {
    VIN                  : String(10);
    County                  : localized String;
    City                    : localized String;
    State                   : localized String;
    Postal_code             : localized String;
    Model_year              : localized String;
    Make                    : localized String;
    Model                   : localized String;
    EVT                     : localized String;
    CAFV                    : localized String;
    Range                   : localized Integer;
    MSRP                    : localized Integer;
    Legislative_district    : localized Integer;
    DOL_Vehicle_ID          : localized Integer64;
    Vehicle_Location        : localized String;
    Electric_utility        : localized String;
    Census_Tract_2020       : localized Integer64;
}
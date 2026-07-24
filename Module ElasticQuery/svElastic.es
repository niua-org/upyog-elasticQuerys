PUT sv-national-dashboard 
{
    "mappings": {
      "properties": {
        "ageGroup": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "averageTATLicenseIssued": {
          "type": "integer"
        },
        "createdBy": {
          "type": "keyword"
        },
        "createdTime": {
          "type": "long"
        },
        "date": {
          "type": "date",
          "format": "dd-MM-yyyy||epoch_millis"
        },
        "fixedSpotsOfferedByStateUT": {
          "type": "integer"
        },
        "fixedSpotsOfferedByULB": {
          "type": "integer"
        },
        "lastModifiedBy": {
          "type": "keyword"
        },
        "lastModifiedTime": {
          "type": "long"
        },
        "licenseByAge_18_30": {
          "type": "integer"
        },
        "licenseByAge_30_45": {
          "type": "integer"
        },
        "licenseByAge_45_60": {
          "type": "integer"
        },
        "licenseByAge_60plus": {
          "type": "integer"
        },
        "licenseByGenderForAgeGroup": {
          "type": "long"
        },
        "module": {
          "type": "keyword"
        },
        "numberOfApplicationsRejected": {
          "type": "integer"
        },
        "numberOfVendingZones": {
          "type": "integer"
        },
        "percentageLicenseIssuedVsApplied": {
          "type": "float"
        },
        "region": {
          "type": "keyword"
        },
        "registrationTypeForVendingType": {
          "type": "long"
        },
        "rejectionRate": {
          "type": "float"
        },
        "state": {
          "type": "keyword"
        },
        "targetAchievementPercentage": {
          "type": "float"
        },
        "timestamp": {
          "type": "date"
        },
        "totalLicenseAppliedbyFemale": {
          "type": "integer"
        },
        "totalLicenseAppliedbyMale": {
          "type": "integer"
        },
        "totalRevenueCollected": {
          "type": "long"
        },
        "totalRevenueTargeted": {
          "type": "long"
        },
        "totalStreetVendingLicenseApplied": {
          "type": "integer"
        },
        "totalStreetVendingLicenseIssued": {
          "type": "integer"
        },
        "totalStreetVendors": {
          "type": "integer"
        },
        "totalUrbanHouseholds": {
          "type": "integer"
        },
        "typeOfRegistration": {
          "type": "integer"
        },
        "ulb": {
          "type": "keyword"
        },
        "vendingType": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ward": {
          "type": "keyword"
        }
      }
    }
}


GET sv-national-dashboard/_search
{
  "size": 1000,
  "query": {
    "match_all": {}
  }
}
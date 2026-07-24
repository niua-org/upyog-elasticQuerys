PUT ptr-national-dashboard
{
  "mappings": {
    "properties": {
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "module": {"type": "keyword"},
      "ward": {"type": "keyword"},
      "ulb": {"type": "keyword"},
      "region": {"type": "keyword"},
      "state": {"type": "keyword"},
      "createdBy": {"type": "keyword"},
      "createdTime": {"type": "long"},
      "lastModifiedBy": {"type": "keyword"},
      "lastModifiedTime": {"type": "long"},
      "timestamp": {"type": "date"},
      "totalPetRegistration": {"type": "integer"},
      "totalApprovedPetRegistration": {"type": "integer"},
      "renewalRate": {"type": "float"},
      "totalEstimatedUnregisterPet": {"type": "integer"},
      "totalComplaintsResolved": {"type": "integer"},
      "totalComplaintsRegistered": {"type": "integer"},
      "totalVaccinatedPet": {"type": "integer"},
      "totalRabiesFreeCertifiedPet": {"type": "integer"},
      "previousYearRevenue": {"type": "long"},
      "currentFYCollection": {"type": "long"},
      "totalCollection": {"type": "long"},
      "registration": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "paymentChannelType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      }
    }
  }
}

GET ptr-national-dashboard/_search
{
  "size": 100,
  "query": {
    "match_all": {}
  }
}
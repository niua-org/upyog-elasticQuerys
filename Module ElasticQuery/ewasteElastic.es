PUT ewaste-national-dashboard
{
  "mappings": {
    "properties": {
      "date": { "type": "date", "format": "dd-MM-yyyy||epoch_millis" },
      "module": { "type": "keyword" },
      "ward": { "type": "keyword" },
      "ulb": { "type": "keyword" },
      "region": { "type": "keyword" },
      "state": { "type": "keyword" },
      "createdBy": { "type": "keyword" },
      "createdTime": { "type": "long" },
      "lastModifiedBy": { "type": "keyword" },
      "lastModifiedTime": { "type": "long" },
      "timestamp": { "type": "date" },
      "totalWasteCollected": { "type": "integer" },
      "estimateWasteGeneration": { "type": "integer" },
      "totalUrbanAreas": { "type": "integer" },
      "totalWasteCollectionCentres": { "type": "integer" },
      "totalVendorsEmpaneled": { "type": "integer" },
      "totalActiveVendors": { "type": "integer" },
      "totalApplicationReceived": { "type": "integer" },
      "totalApplicationResolved": { "type": "integer" },
      "totalWasteProcessed": { "type": "integer" },
      "currentFYCollection": { "type": "long" },
      "previousYearCollection": { "type": "long" },
      "wasteCollection": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword", "ignore_above": 256 }
        }
      }
    }
  }
}


GET ewaste-national-dashboard/_search
{
  "size": 100,
  "query": {
    "match_all": {}
  }
}


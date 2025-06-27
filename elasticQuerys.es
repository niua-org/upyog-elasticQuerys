PUT /sv-national-dashboard
{
  "mappings": {
    "properties": {
      "date": { "type": "keyword" },
      "module": { "type": "keyword" },
      "region": { "type": "keyword" },
      "state": { "type": "keyword" },
      "ulb": { "type": "keyword" },
      "ward": { "type": "keyword" },
      "createdBy": { "type": "keyword" },
      "createdTime": { "type": "long" },
      "lastModifiedBy": { "type": "keyword" },
      "lastModifiedTime": { "type": "long" },
      "timestamp": { "type": "long" },
      "totalUrbanHouseholds": { "type": "integer" },
      "totalStreetVendingLicenseApplied": { "type": "integer" },
      "percentageLicenseIssuedVsApplied": { "type": "float" },
      "averageTATLicenseIssued": { "type": "integer" },
      "licenseByAge_60plus": { "type": "integer" },
      "licenseByAge_30_45": { "type": "integer" },
      "fixedSpotsOfferedByStateUT": { "type": "integer" },
      "licenseByAge_18_30": { "type": "integer" },
      "numberOfApplicationsRejected": { "type": "integer" },
      "rejectionRate": { "type": "float" },
      "numberOfVendingZones": { "type": "integer" },
      "totalStreetVendingLicenseIssued": { "type": "integer" },
      "typeOfRegistration": { "type": "integer" },
      "fixedSpotsOfferedByULB": { "type": "integer" },
      "totalRevenueCollected": { "type": "long" },
      "totalStreetVendors": { "type": "integer" },
      "totalRevenueTargeted": { "type": "long" },
      "targetAchievementPercentage": { "type": "float" },
      "licenseByAge_45_60": { "type": "integer" }
    }
  }
}



DELETE sv-national-dashboard
GET sv-national-dashboard/_search
{
  "query": {
    "match_all": {}
  },
  "size": 10000
}


PUT _ingest/pipeline/add_timestamp_pipeline
{
  "description": "Add timestamp to document",
  "processors": [
    {
      "set": {
        "field": "timestamp",
        "value": "{{_ingest.timestamp}}"
      }
    }
  ]
}


//PGR
GET pgr-national-dashboard/_count
GET pgr-national-dashboard-backup/_count
GET pgr-national-dashboard-temp/_count

GET pgr-national-dashboard
GET pgr-national-dashboard-backup
GET pgr-national-dashboard-temp


POST _reindex
{
  "source": {
    "index": "pgr-national-dashboard"
  },
  "dest": {
    "index": "pgr-national-dashboard-backup"
   }
}

POST _reindex
{
  "source": {
    "index": "pgr-national-dashboard"
  },
  "dest": {
    "index": "pgr-national-dashboard-temp",
    "pipeline": "add_timestamp_pipeline"
   }
}

GET pgr-national-dashboard
PUT pgr-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "averageSolutionTimeForDepartment": {
        "type": "long"
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "category": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "channel": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "completionRateForDepartment": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "department": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "slaAchievementForDepartment": {
        "type": "long"
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "status": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysAssignedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysClosedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysComplaintsForCategory": {
        "type": "long"
      },
      "todaysComplaintsForChannel": {
        "type": "long"
      },
      "todaysComplaintsForDepartment": {
        "type": "long"
      },
      "todaysComplaintsForStatus": {
        "type": "long"
      },
      "todaysOpenComplaintsForDepartment": {
        "type": "long"
      },
      "todaysReassignRequestedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysReassignedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysRejectedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysReopenedComplaintsForDepartment": {
        "type": "long"
      },
      "todaysResolvedComplaintsForDepartment": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "uniqueCitizens": {
        "type": "long"
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "pgr-national-dashboard-temp"
  },
  "dest": {
    "index": "pgr-national-dashboard"
   }
}

//pipeline
GET  _ingest/pipeline/pgr-pipeline-dashboard-common
PUT _ingest/pipeline/pgr-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "averageSolutionTimeForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "completionRateForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaAchievementForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysAssignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysOpenComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignRequestedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysRejectedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReopenedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysResolvedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForCategory",
        "value": 0
      }
    },{
      "set": {
        "field": "todaysComplaintsForChannel",
        "value": 0
      }
    },{
      "set": {
        "field": "todaysComplaintsForStatus",
        "value": 0
      }
    }
  ]
} 

GET  _ingest/pipeline/pgr-pipeline-dashboard-department
PUT _ingest/pipeline/pgr-pipeline-dashboard-department
{
  "processors": [
    {
      "set": {
        "field": "uniqueCitizens",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/pgr-pipeline-dashboard-category
PUT _ingest/pipeline/pgr-pipeline-dashboard-category
{
  "processors": [
    {
      "set": {
        "field": "averageSolutionTimeForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "completionRateForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaAchievementForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysAssignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysOpenComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignRequestedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysRejectedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReopenedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysResolvedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "uniqueCitizens",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/pgr-pipeline-dashboard-channel
PUT _ingest/pipeline/pgr-pipeline-dashboard-channel
{
  "processors": [
    {
      "set": {
        "field": "averageSolutionTimeForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "completionRateForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaAchievementForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysAssignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysOpenComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignRequestedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysRejectedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReopenedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysResolvedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "uniqueCitizens",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/pgr-pipeline-dashboard-status
PUT _ingest/pipeline/pgr-pipeline-dashboard-status
{
  "processors": [
    {
      "set": {
        "field": "averageSolutionTimeForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "completionRateForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaAchievementForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysAssignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysOpenComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignRequestedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReassignedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysRejectedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysReopenedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysResolvedComplaintsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "uniqueCitizens",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysComplaintsForChannel",
        "value": 0
      }
    }
  ]
}

//transforms
POST _transform/pgr-transform-ward-common/_stop
GET _transform/pgr-transform-ward-common
PUT _transform/pgr-transform-ward-common
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "uniqueCitizens": {
        "avg": {
          "field": "uniqueCitizens"
        }
      },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-ward-common/_start
GET pgr-national-dashboard-ward/_search
GET pgr-national-dashboard-ward/_count

POST _transform/pgr-transform-month-common/_stop
GET _transform/pgr-transform-month-common
PUT _transform/pgr-transform-month-common
{
  "source": {
    "index": [
      "pgr-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "uniqueCitizens": {
        "sum": {
          "field": "uniqueCitizens"
        }
      },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-month",
    "pipeline": "pgr-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-month-common/_start
GET pgr-national-dashboard-month/_search
GET pgr-national-dashboard-month/_count

POST _transform/pgr-transform-month-department/_stop
GET _transform/pgr-transform-month-department
PUT _transform/pgr-transform-month-department
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "department":{
        "terms": {
          "field": "department.keyword"
        }
      }
    },
    "aggregations": {
      "averageSolutionTimeForDepartment": {
        "avg": {
          "field": "averageSolutionTimeForDepartment"
        }
      },
      "completionRateForDepartment": {
        "sum": {
          "field": "completionRateForDepartment"
        }
      },
      "slaAchievementForDepartment": {
        "sum": {
          "field": "slaAchievementForDepartment"
        }
      },
      "todaysAssignedComplaintsForDepartment": {
        "sum": {
          "field": "todaysAssignedComplaintsForDepartment"
        }
      },
      "todaysClosedComplaintsForDepartment": {
        "sum": {
          "field": "todaysClosedComplaintsForDepartment"
        }
      },
      "todaysComplaintsForDepartment": {
        "sum": {
          "field": "todaysComplaintsForDepartment"
        }
      },
      "todaysOpenComplaintsForDepartment": {
        "sum": {
          "field": "todaysOpenComplaintsForDepartment"
        }
      },
      "todaysReassignRequestedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReassignRequestedComplaintsForDepartment"
        }
      },
      "todaysReassignedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReassignedComplaintsForDepartment"
        }
      },
      "todaysRejectedComplaintsForDepartment": {
        "sum": {
          "field": "todaysRejectedComplaintsForDepartment"
        }
      },
      "todaysReopenedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReopenedComplaintsForDepartment"
        }
      },
      "todaysResolvedComplaintsForDepartment": {
        "sum": {
          "field": "todaysResolvedComplaintsForDepartment"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-month",
    "pipeline": "pgr-pipeline-dashboard-department"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-month-department/_start
GET pgr-national-dashboard-month/_search
GET pgr-national-dashboard-month/_count

POST _transform/pgr-transform-month-category/_stop
GET _transform/pgr-transform-month-category
PUT _transform/pgr-transform-month-category
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "category":{
        "terms": {
          "field": "category.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForCategory": {
        "sum": {
          "field": "todaysComplaintsForCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-month",
    "pipeline": "pgr-pipeline-dashboard-category"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-month-category/_start
GET pgr-national-dashboard-month/_search
GET pgr-national-dashboard-month/_count

POST _transform/pgr-transform-month-channel/_stop
GET _transform/pgr-transform-month-channel
PUT _transform/pgr-transform-month-channel
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "channel":{
        "terms": {
          "field": "channel.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForChannel": {
        "sum": {
          "field": "todaysComplaintsForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-month",
    "pipeline": "pgr-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-month-channel/_start
GET pgr-national-dashboard-month/_search
GET pgr-national-dashboard-month/_count

POST _transform/pgr-transform-month-status/_stop
GET _transform/pgr-transform-month-status
PUT _transform/pgr-transform-month-status
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "status":{
        "terms": {
          "field": "status.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForStatus": {
        "sum": {
          "field": "todaysComplaintsForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-month",
    "pipeline": "pgr-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-month-status/_start
GET pgr-national-dashboard-month/_search
GET pgr-national-dashboard-month/_count

POST _transform/pgr-transform-week-common/_stop
GET _transform/pgr-transform-week-common
PUT _transform/pgr-transform-week-common
{
  "source": {
    "index": [
      "pgr-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "uniqueCitizens": {
        "sum": {
          "field": "uniqueCitizens"
        }
      },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-week",
    "pipeline": "pgr-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-week-common/_start
GET pgr-national-dashboard-week/_search
GET pgr-national-dashboard-week/_count

POST _transform/pgr-transform-week-department/_stop
GET _transform/pgr-transform-week-department
PUT _transform/pgr-transform-week-department
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "department":{
        "terms": {
          "field": "department.keyword"
        }
      }
    },
    "aggregations": {
      "averageSolutionTimeForDepartment": {
        "avg": {
          "field": "averageSolutionTimeForDepartment"
        }
      },
      "completionRateForDepartment": {
        "sum": {
          "field": "completionRateForDepartment"
        }
      },
      "slaAchievementForDepartment": {
        "sum": {
          "field": "slaAchievementForDepartment"
        }
      },
      "todaysAssignedComplaintsForDepartment": {
        "sum": {
          "field": "todaysAssignedComplaintsForDepartment"
        }
      },
      "todaysClosedComplaintsForDepartment": {
        "sum": {
          "field": "todaysClosedComplaintsForDepartment"
        }
      },
      "todaysComplaintsForDepartment": {
        "sum": {
          "field": "todaysComplaintsForDepartment"
        }
      },
      "todaysOpenComplaintsForDepartment": {
        "sum": {
          "field": "todaysOpenComplaintsForDepartment"
        }
      },
      "todaysReassignRequestedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReassignRequestedComplaintsForDepartment"
        }
      },
      "todaysReassignedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReassignedComplaintsForDepartment"
        }
      },
      "todaysRejectedComplaintsForDepartment": {
        "sum": {
          "field": "todaysRejectedComplaintsForDepartment"
        }
      },
      "todaysReopenedComplaintsForDepartment": {
        "sum": {
          "field": "todaysReopenedComplaintsForDepartment"
        }
      },
      "todaysResolvedComplaintsForDepartment": {
        "sum": {
          "field": "todaysResolvedComplaintsForDepartment"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-week",
    "pipeline": "pgr-pipeline-dashboard-department"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-week-department/_start
GET pgr-national-dashboard-week/_search
GET pgr-national-dashboard-week/_count

POST _transform/pgr-transform-week-category/_stop
GET _transform/pgr-transform-week-category
PUT _transform/pgr-transform-week-category
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "category":{
        "terms": {
          "field": "category.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForCategory": {
        "sum": {
          "field": "todaysComplaintsForCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-week",
    "pipeline": "pgr-pipeline-dashboard-category"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-week-category/_start
GET pgr-national-dashboard-week/_search
GET pgr-national-dashboard-week/_count

POST _transform/pgr-transform-week-channel/_stop
GET _transform/pgr-transform-week-channel
PUT _transform/pgr-transform-week-channel
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "channel":{
        "terms": {
          "field": "channel.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForChannel": {
        "sum": {
          "field": "todaysComplaintsForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-week",
    "pipeline": "pgr-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-week-channel/_start
GET pgr-national-dashboard-week/_search
GET pgr-national-dashboard-week/_count

POST _transform/pgr-transform-week-status/_stop
GET _transform/pgr-transform-week-status
PUT _transform/pgr-transform-week-status
{
  "source": {
    "index": [
      "pgr-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "status":{
        "terms": {
          "field": "status.keyword"
        }
      }
    },
    "aggregations": {
      "todaysComplaintsForStatus": {
        "sum": {
          "field": "todaysComplaintsForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pgr-national-dashboard-week",
    "pipeline": "pgr-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/pgr-transform-week-status/_start
GET pgr-national-dashboard-week/_search
GET pgr-national-dashboard-week/_count

GET pgr-national-dashboard-week/_count
GET pgr-national-dashboard-month/_count
GET pgr-national-dashboard-ward/_count


GET pgr-national-dashboard-ward
GET pgr-national-dashboard-week
GET pgr-national-dashboard-month


//FIRENOC-----------------------------------------------------------------
//PIPELINE
GET firenoc-national-dashboard/_count
GET firenoc-national-dashboard-backup/_count
GET firenoc-national-dashboard-temp/_count

GET firenoc-national-dashboard
GET firenoc-national-dashboard-backup
GET firenoc-national-dashboard-temp

POST _reindex
{
  "source": {
    "index": "firenoc-national-dashboard"
  },
  "dest": {
    "index": "firenoc-national-dashboard-backup"
   }
}

POST _reindex
{
  "source": {
    "index": "firenoc-national-dashboard"
  },
  "dest": {
    "index": "firenoc-national-dashboard-temp",
    "pipeline": "add_timestamp_pipeline"
   }
}

DELETE firenoc-national-dashboard
PUT firenoc-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "actualNOCIssuedForDepartment": {
        "type": "long"
      },
      "actualNOCIssuedForUsageType": {
        "type": "long"
      },
      "applicationType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "avgDaysToIssueActualNOCForDepartment": {
        "type": "long"
      },
      "avgDaysToIssueProvisionalNOCForDepartment": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "department": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "nocIssuedTodayForType": {
        "type": "long"
      },
      "paymentMode": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "provisionalNOCIssuedForDepartment": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "slaComplianceActualForDepartment": {
        "type": "long"
      },
      "slaComplianceProvisionalForDepartment": {
        "type": "long"
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysApplicationsForApplicationType": {
        "type": "long"
      },
      "todaysApplicationsForDepartment": {
        "type": "long"
      },
      "todaysApprovedApplications": {
        "type": "long"
      },
      "todaysApprovedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysClosedApplications": {
        "type": "long"
      },
      "todaysCollectionForDepartment": {
        "type": "long"
      },
      "todaysCollectionForPaymentMode": {
        "type": "long"
      },
      "todaysCompletedApplicationsWithinSLA": {
        "type": "long"
      },
      "type": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "usageType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "firenoc-national-dashboard-temp"
  },
  "dest": {
    "index": "firenoc-national-dashboard"
   }
}


GET firenoc-national-dashboard-ward/_count
GET firenoc-national-dashboard-week/_count
GET firenoc-national-dashboard-month/_count

//PIPELINES
GET _ingest/pipeline/firenoc-pipeline-dashboard-common
PUT _ingest/pipeline/firenoc-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "actualNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueActualNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueProvisionalNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "provisionalNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceActualForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceProvisionalForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "nocIssuedTodayForType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForApplicationType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/firenoc-pipeline-dashboard-department
PUT _ingest/pipeline/firenoc-pipeline-dashboard-department
{
  "processors": [
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "nocIssuedTodayForType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForApplicationType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/firenoc-pipeline-dashboard-usagetype
PUT _ingest/pipeline/firenoc-pipeline-dashboard-usagetype
{
  "processors": [
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueActualNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueProvisionalNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "provisionalNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceActualForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceProvisionalForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "nocIssuedTodayForType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForApplicationType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/firenoc-pipeline-dashboard-type
PUT _ingest/pipeline/firenoc-pipeline-dashboard-type
{
  "processors": [
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueActualNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueProvisionalNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "provisionalNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceActualForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceProvisionalForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForApplicationType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/firenoc-pipeline-dashboard-applicationtype
PUT _ingest/pipeline/firenoc-pipeline-dashboard-applicationtype
{
  "processors": [
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueActualNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueProvisionalNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "provisionalNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceActualForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceProvisionalForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "nocIssuedTodayForType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/firenoc-pipeline-dashboard-paymentMode
PUT _ingest/pipeline/firenoc-pipeline-dashboard-paymentMode
{
  "processors": [
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueActualNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysToIssueProvisionalNOCForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "provisionalNOCIssuedForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceActualForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceProvisionalForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForDepartment",
        "value": 0
      }
    },
    {
      "set": {
        "field": "actualNOCIssuedForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "nocIssuedTodayForType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApplicationsForApplicationType",
        "value": 0
      }
    }
  ]
}

//TRANSFORMERS
POST _transform/firenoc-transform-ward-common/_stop
GET _transform/firenoc-transform-ward-common
PUT _transform/firenoc-transform-ward-common
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
       "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysApprovedApplications": {
        "avg": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "todaysClosedApplications": {
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
  "pendingApplicationsBeyondTimeline":{
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-ward-common/_start
GET firenoc-national-dashboard-ward/_search
GET firenoc-national-dashboard-ward/_count

POST _transform/firenoc-transform-month-common/_stop
GET _transform/firenoc-transform-month-common
PUT _transform/firenoc-transform-month-common
{
  "source": {
    "index": [
      "firenoc-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
"pendingApplicationsBeyondTimeline":{
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-common/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-month-department/_stop
GET _transform/firenoc-transform-month-department
PUT _transform/firenoc-transform-month-department
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "department": {
        "terms": {
          "field": "department.keyword"
        }
      }
    },
    "aggregations": {
      "provisionalNOCIssuedForDepartment": {
        "sum": {
          "field": "provisionalNOCIssuedForDepartment"
        }
      },
      "slaComplianceActualForDepartment": {
        "sum": {
          "field": "slaComplianceActualForDepartment"
        }
      },
      "actualNOCIssuedForDepartment": {
        "sum": {
          "field": "actualNOCIssuedForDepartment"
        }
      },
      "slaComplianceProvisionalForDepartment":{
        "sum": {
          "field": "slaComplianceProvisionalForDepartment"
        }
      },
      "todaysApplicationsForDepartment":{
        "sum": {
          "field": "todaysApplicationsForDepartment"
        }
      },
      "todaysCollectionForDepartment":{
        "sum": {
          "field": "todaysCollectionForDepartment"
        }
      },
      "avgDaysToIssueActualNOCForDepartment":{
        "avg": {
          "field": "avgDaysToIssueActualNOCForDepartment"
        }
      },
      "avgDaysToIssueProvisionalNOCForDepartment":{
        "avg": {
          "field": "avgDaysToIssueProvisionalNOCForDepartment"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-department"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-department/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-month-usagetype/_stop
GET _transform/firenoc-transform-month-usagetype
PUT _transform/firenoc-transform-month-usagetype
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageType": {
        "terms": {
          "field": "usageType.keyword"
        }
      }
    },
    "aggregations": {
      "actualNOCIssuedForUsageType": {
        "sum": {
          "field": "actualNOCIssuedForUsageType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-usagetype"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-usagetype/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-month-type/_stop
GET _transform/firenoc-transform-month-type
PUT _transform/firenoc-transform-month-type
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "type": {
        "terms": {
          "field": "type.keyword"
        }
      }
    },
    "aggregations": {
      "nocIssuedTodayForType": {
        "sum": {
          "field": "nocIssuedTodayForType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-type"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-type/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-month-applicationtype/_stop
GET _transform/firenoc-transform-month-applicationtype
PUT _transform/firenoc-transform-month-applicationtype
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "applicationType": {
        "terms": {
          "field": "applicationType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysApplicationsForApplicationType": {
        "sum": {
          "field": "todaysApplicationsForApplicationType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-applicationtype"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-applicationtype/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-month-paymentmode/_stop
GET _transform/firenoc-transform-month-paymentmode
PUT _transform/firenoc-transform-month-paymentmode
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-month",
    "pipeline": "firenoc-pipeline-dashboard-paymentMode"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-month-paymentmode/_start
GET firenoc-national-dashboard-month/_search
GET firenoc-national-dashboard-month/_count

POST _transform/firenoc-transform-week-common/_stop
GET _transform/firenoc-transform-week-common
PUT _transform/firenoc-transform-week-common
{
  "source": {
    "index": [
      "firenoc-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
"pendingApplicationsBeyondTimeline":{
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-common/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

POST _transform/firenoc-transform-week-department/_stop
GET _transform/firenoc-transform-week-department
PUT _transform/firenoc-transform-week-department
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "department": {
        "terms": {
          "field": "department.keyword"
        }
      }
    },
    "aggregations": {
      "provisionalNOCIssuedForDepartment": {
        "sum": {
          "field": "provisionalNOCIssuedForDepartment"
        }
      },
      "slaComplianceActualForDepartment": {
        "sum": {
          "field": "slaComplianceActualForDepartment"
        }
      },
      "actualNOCIssuedForDepartment": {
        "sum": {
          "field": "actualNOCIssuedForDepartment"
        }
      },
      "slaComplianceProvisionalForDepartment":{
        "sum": {
          "field": "slaComplianceProvisionalForDepartment"
        }
      },
      "todaysApplicationsForDepartment":{
        "sum": {
          "field": "todaysApplicationsForDepartment"
        }
      },
      "todaysCollectionForDepartment":{
        "sum": {
          "field": "todaysCollectionForDepartment"
        }
      },
      "avgDaysToIssueActualNOCForDepartment":{
        "avg": {
          "field": "avgDaysToIssueActualNOCForDepartment"
        }
      },
      "avgDaysToIssueProvisionalNOCForDepartment":{
        "avg": {
          "field": "avgDaysToIssueProvisionalNOCForDepartment"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-department"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-department/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

POST _transform/firenoc-transform-week-usagetype/_stop
GET _transform/firenoc-transform-week-usagetype
PUT _transform/firenoc-transform-week-usagetype
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageType": {
        "terms": {
          "field": "usageType.keyword"
        }
      }
    },
    "aggregations": {
      "actualNOCIssuedForUsageType": {
        "sum": {
          "field": "actualNOCIssuedForUsageType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-usagetype"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-usagetype/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

POST _transform/firenoc-transform-week-type/_stop
GET _transform/firenoc-transform-week-type
PUT _transform/firenoc-transform-week-type
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "type": {
        "terms": {
          "field": "type.keyword"
        }
      }
    },
    "aggregations": {
      "nocIssuedTodayForType": {
        "sum": {
          "field": "nocIssuedTodayForType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-type"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-type/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

POST _transform/firenoc-transform-week-applicationtype/_stop
GET _transform/firenoc-transform-week-applicationtype
PUT _transform/firenoc-transform-week-applicationtype
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "applicationType": {
        "terms": {
          "field": "applicationType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysApplicationsForApplicationType": {
        "sum": {
          "field": "todaysApplicationsForApplicationType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-applicationtype"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-applicationtype/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

POST _transform/firenoc-transform-week-paymentmode/_stop
GET _transform/firenoc-transform-week-paymentmode
PUT _transform/firenoc-transform-week-paymentmode
{
  "source": {
    "index": [
      "firenoc-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "firenoc-national-dashboard-week",
    "pipeline": "firenoc-pipeline-dashboard-paymentMode"
  },
  "frequency": "1m"
}
POST _transform/firenoc-transform-week-paymentmode/_start
GET firenoc-national-dashboard-week/_search
GET firenoc-national-dashboard-week/_count

GET firenoc-national-dashboard-ward/_count
GET firenoc-national-dashboard-week/_count
GET firenoc-national-dashboard-month/_count



//FSM-----------------------------------------------------------------------
GET fsm-national-dashboard
GET fsm-national-dashboard-backup
GET fsm-national-dashboard-temp

GET fsm-national-dashboard/_count
GET fsm-national-dashboard-backup/_count
GET fsm-national-dashboard-temp/_count

POST _reindex
{
  "source": {
    "index": "fsm-national-dashboard"
  },
  "dest": {
    "index": "fsm-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "fsm-national-dashboard"
  },
  "dest": {
    "index": "fsm-national-dashboard-temp",
    "pipeline": "add_timestamp_pipeline"
   }
}

GET fsm-national-dashboard
PUT fsm-national-dashboard
{
  "mappings": {
    "properties": {
      "averageCitizenRating": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
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
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysApplications": {
        "type": "long"
      },
      "todaysApprovedApplications": {
        "type": "long"
      },
      "todaysApprovedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysClosedApplications": {
        "type": "long"
      },
      "todaysCollectionForPaymentChannelType": {
        "type": "long"
      },
      "todaysCollectionForUsageCategory": {
        "type": "long"
      },
      "totalFSTPCapacity": {
        "type": "long"
      },
      "totalSludgeCollected": {
        "type": "long"
      },
      "totalSludgeDumped": {
        "type": "long"
      },
      "totalVehicleTrips": {
        "type": "long"
      },
      "transactions": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "usageCategory": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "fsm-national-dashboard-temp"
  },
  "dest": {
    "index": "fsm-national-dashboard"
     }
}

GET fsm-national-dashboard-ward/_count
GET fsm-national-dashboard-week/_count
GET fsm-national-dashboard-month/_count

//Pipeline 1 (common)
GET _ingest/pipeline/fsm-pipeline-dashboard-common
PUT _ingest/pipeline/fsm-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageCategory",
        "value": 0
      }
    }
  ]
}

//Pipeline 2 (paymentChannelType)
GET _ingest/pipeline/fsm-pipeline-dashboard-paymentchanneltype
PUT _ingest/pipeline/fsm-pipeline-dashboard-paymentchanneltype
{
  "processors": [
    {
      "set": {
        "field": "todaysApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalVehicleTrips",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalSludgeDumped",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalSludgeCollected",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalFSTPCapacity",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageCitizenRating",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForusageCategory",
        "value": 0
      }
    }
  ]
}

//Pipeline 3 (usageCategory)
GET _ingest/pipeline/fsm-pipeline-dashboard-usagecategory
PUT _ingest/pipeline/fsm-pipeline-dashboard-usagecategory
{
  "processors": [
    {
      "set": {
        "field": "todaysApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalVehicleTrips",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalSludgeDumped",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalSludgeCollected",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalFSTPCapacity",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageCitizenRating",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForpaymentChannelType",
        "value": 0
      }
    }
  ]
}

//Transform for removing ward level duplicates
PUT _transform/fsm-transform-ward-common
{
  "source": {
    "index": [
      "fsm-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "averageCitizenRating": {
        "avg": {
          "field": "averageCitizenRating"
        }
      },
      "pendingApplicationsBeyondTimeline":{
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
     "todaysApplications":{
        "avg": {
          "field": "todaysApplications"
        }
      },
      "todaysApprovedApplications":{
        "avg": {
          "field": "todaysApprovedApplications"
        }
      },
     "todaysApprovedApplicationsWithinSLA":{
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
    "todaysClosedApplications":{
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
     "totalFSTPCapacity":{
        "avg": {
          "field": "totalFSTPCapacity"
        }
      },
      "totalSludgeCollected":{
        "avg": {
          "field": "totalSludgeCollected"
        }
      },
      "totalSludgeDumped":{
        "avg": {
          "field": "totalSludgeDumped"
        }
      },
      "totalVehicleTrips":{
        "avg": {
          "field": "totalVehicleTrips"
        }
      },
      "Transactions":{
        "avg": {
          "field": "Transactions"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "fsm-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-ward-common/_start
GET fsm-national-dashboard-ward/_search
GET fsm-national-dashboard-ward/_count


//Transforms for monthly(new env)
//Transform 1(common)

PUT _transform/fsm-transform-month-common
{
  "source": {
    "index": [
      "fsm-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysApplications": {
        "sum": {
          "field": "todaysApplications"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "todaysClosedApplications": {
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
      "transactions": {
        "avg": {
          "field": "transactions"
        }
      },
      "totalVehicleTrips": {
        "sum": {
          "field": "totalVehicleTrips"
        }
      },
      "totalSludgeDumped": {
        "sum": {
          "field": "totalSludgeDumped"
        }
      },
      "totalSludgeCollected": {
        "sum": {
          "field": "totalSludgeCollected"
        }
      },
      "totalFSTPCapacity": {
        "sum": {
          "field": "totalFSTPCapacity"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "averageCitizenRating": {
        "sum": {
          "field": "averageCitizenRating"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
    },
  "dest": {
    "index": "fsm-national-dashboard-month",
    "pipeline": "fsm-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-month-common/_start
GET fsm-national-dashboard-month/_search
GET fsm-national-dashboard-month/_count


//Transform 2  (paymentchanneltype)
PUT _transform/fsm-transform-month-paymentchanneltype
{
  "source": {
    "index": [
      "fsm-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType":{
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForpaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForpaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "fsm-national-dashboard-month",
    "pipeline": "fsm-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-month-paymentchanneltype/_start
GET fsm-national-dashboard-month/_search
GET fsm-national-dashboard-month/_count


//Transform 3  (usagecategory)
PUT _transform/fsm-transform-month-usagecategory
{
  "source": {
    "index": [
      "fsm-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageCategory":{
        "terms": {
          "field": "usageCategory.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForusageCategory": {
        "sum": {
          "field": "todaysCollectionForusageCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "fsm-national-dashboard-month",
    "pipeline": "fsm-pipeline-dashboard-usagecategory"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-month-usagecategory/_start
GET fsm-national-dashboard-month/_search
GET fsm-national-dashboard-month/_count


//Transforms for weekly
//Transform 1(common)
PUT _transform/fsm-transform-week-common
{
  "source": {
    "index": [
      "fsm-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysApplications": {
        "sum": {
          "field": "todaysApplications"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "todaysClosedApplications": {
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
      "transactions": {
        "avg": {
          "field": "transactions"
        }
      },
      "totalVehicleTrips": {
        "sum": {
          "field": "totalVehicleTrips"
        }
      },
      "totalSludgeDumped": {
        "sum": {
          "field": "totalSludgeDumped"
        }
      },
      "totalSludgeCollected": {
        "sum": {
          "field": "totalSludgeCollected"
        }
      },
      "totalFSTPCapacity": {
        "sum": {
          "field": "totalFSTPCapacity"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "averageCitizenRating": {
        "sum": {
          "field": "averageCitizenRating"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
    },
  "dest": {
    "index": "fsm-national-dashboard-week",
    "pipeline": "fsm-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-week-common/_start
GET fsm-national-dashboard-week/_search
GET fsm-national-dashboard-week/_count

//Transform 2 (paymentchanneltype)
PUT _transform/fsm-transform-week-paymentchanneltype
{
  "source": {
    "index": [
      "fsm-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType":{
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForpaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForpaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "fsm-national-dashboard-week",
    "pipeline": "fsm-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-week-paymentchanneltype/_start
GET fsm-national-dashboard-week/_search
GET fsm-national-dashboard-week/_count


//Transform 3 (usagecategory)
PUT _transform/fsm-transform-week-usagecategory
{
  "source": {
    "index": [
      "fsm-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageCategory":{
        "terms": {
          "field": "usageCategory.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForusageCategory": {
        "sum": {
          "field": "todaysCollectionForusageCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "fsm-national-dashboard-week",
    "pipeline": "fsm-pipeline-dashboard-usagecategory"
  },
  "frequency": "1m"
}
POST _transform/fsm-transform-week-usagecategory/_start
GET fsm-national-dashboard-week/_search
GET fsm-national-dashboard-week/_count

GET fsm-national-dashboard-ward/_count
GET fsm-national-dashboard-week/_count
GET fsm-national-dashboard-month/_count


//OBPAS-------------------------------------------------
GET obps-national-dashboard
GET obps-national-dashboard-backup
GET obps-national-dashboard-temp

GET obps-national-dashboard/_count
GET obps-national-dashboard-backup/_count
GET obps-national-dashboard-temp/_count

POST _reindex
{
  "source": {
    "index": "obps-national-dashboard"
  },
  "dest": {
    "index": "obps-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "obps-national-dashboard"
  },
  "dest": {
    "index": "obps-national-dashboard-temp",
     "pipeline": "add_timestamp_pipeline"
   }
}

GET obps-national-dashboard
PUT obps-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "applicationsSubmitted": {
        "type": "long"
      },
      "applicationsWithDeviation": {
        "type": "long"
      },
      "averageDaysToIssueOC": {
        "type": "long"
      },
      "averageDaysToIssuePermit": {
        "type": "long"
      },
      "averageDeviation": {
        "type": "long"
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "landAreaAppliedInSystemForBPA": {
        "type": "long"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ocIssued": {
        "type": "long"
      },
      "ocPlansScrutinized": {
        "type": "long"
      },
      "ocSubmitted": {
        "type": "long"
      },
      "ocWithDeviation": {
        "type": "long"
      },
      "occupancyType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "paymentMode": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "permitsIssuedForOccupancyType": {
        "type": "long"
      },
      "permitsIssuedForRiskType": {
        "type": "long"
      },
      "permitsIssuedForSubOccupancyType": {
        "type": "long"
      },
      "plansScrutinized": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "riskType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "slaComplianceOC": {
        "type": "long"
      },
      "slaCompliancePermit": {
        "type": "long"
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "subOccupancyType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysApprovedApplications": {
        "type": "long"
      },
      "todaysApprovedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysClosedApplicationsOC": {
        "type": "long"
      },
      "todaysClosedApplicationsPermit": {
        "type": "long"
      },
      "todaysCollectionForPaymentMode": {
        "type": "long"
      },
      "todaysCompletedApplicationsWithinSLAOC": {
        "type": "long"
      },
      "todaysCompletedApplicationsWithinSLAPermit": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "obps-national-dashboard-temp"
  },
  "dest": {
    "index": "obps-national-dashboard"
     }
}

GET obps-national-dashboard/_count
GET obps-national-dashboard-backup/_count
GET obps-national-dashboard-temp/_count

GET obps-national-dashboard-ward/_count
GET obps-national-dashboard-week/_count
GET obps-national-dashboard-month/_count

//Pipelines 
//Pipeline 1 (common)
GET _ingest/pipeline/obps-pipeline-dashboard-common
PUT _ingest/pipeline/obps-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "permitsIssuedForOccupancyType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForRiskType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForSubOccupancyType",
        "value": 0
      }
    }
  ]
}

//Pipeline 2 (OccupancyType)
GET _ingest/pipeline/obps-pipeline-dashboard-occupancytype
PUT _ingest/pipeline/obps-pipeline-dashboard-occupancytype
{
  "processors": [
    {
      "set": {
        "field": "applicationsSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssueOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssuePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocIssued",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocPlansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliancePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "plansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "landAreaAppliedInSystemForBPA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
     }
	},
	{
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
     }
	},
	{
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
     }
	},
	{
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
     }
	},
	{
      "set": {
        "field": "StipulatedDays",
        "value": 0
     }
	},
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForRiskType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForSubOccupancyType",
        "value": 0
      }
    }
  ]
}

//Pipeline 3 (PaymentMode)
GET _ingest/pipeline/obps-pipeline-dashboard-paymentMode
PUT _ingest/pipeline/obps-pipeline-dashboard-paymentMode
{
  "processors": [
    {
      "set": {
        "field": "applicationsSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssueOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssuePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocIssued",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocPlansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliancePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "plansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "landAreaAppliedInSystemForBPA",
        "value": 0
      }
    },
	{
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
     }
	},
	{
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
     }
	},
	{
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
     }
	},
	{
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
     }
	},
	{
      "set": {
        "field": "StipulatedDays",
        "value": 0
     }
	},
    {
      "set": {
        "field": "permitsIssuedForOccupancyType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForRiskType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForSubOccupancyType",
        "value": 0
      }
    }
  ]
}

//Pipeline 4 (RiskType)
GET _ingest/pipeline/obps-pipeline-dashboard-risktype
PUT _ingest/pipeline/obps-pipeline-dashboard-risktype
{
  "processors": [
    {
      "set": {
        "field": "applicationsSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssueOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssuePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocIssued",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocPlansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliancePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "plansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "landAreaAppliedInSystemForBPA",
        "value": 0
      }
    },
	 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
     }
        },
        {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
     }
        },
        {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
     }
        },
        {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
     }
        },
        {
      "set": {
        "field": "StipulatedDays",
        "value": 0
     }
        },
    {
      "set": {
        "field": "permitsIssuedForOccupancyType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForSubOccupancyType",
        "value": 0
      }
    }
  ]
}

//Pipeline 5 (SubOccupancyType)
GET _ingest/pipeline/obps-pipeline-dashboard-suboccupancytype
PUT _ingest/pipeline/obps-pipeline-dashboard-suboccupancytype
{
  "processors": [
    {
      "set": {
        "field": "applicationsSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssueOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDaysToIssuePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "averageDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocIssued",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocPlansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocSubmitted",
        "value": 0
      }
    },
    {
      "set": {
        "field": "ocWithDeviation",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaComplianceOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliancePermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplicationsPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAOC",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLAPermit",
        "value": 0
      }
    },
    {
      "set": {
        "field": "plansScrutinized",
        "value": 0
      }
    },
    {
      "set": {
        "field": "landAreaAppliedInSystemForBPA",
        "value": 0
      }
    },
	{
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
     }
        },
        {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
     }
        },
        {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
     }
        },
        {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
     }
        },
        {
      "set": {
        "field": "StipulatedDays",
        "value": 0
     }
        },
    {
      "set": {
        "field": "permitsIssuedForOccupancyType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "permitsIssuedForRiskType",
        "value": 0
      }
    }
  ]
}

//Transforms for ward
POST _transform/obps-transform-ward-common/_stop
PUT _transform/obps-transform-ward-common
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      }
    },
    "aggregations": {
      "applicationsSubmitted": {
        "avg": {
          "field": "applicationsSubmitted"
        }
      },
      "applicationsWithDeviation": {
        "avg": {
          "field": "applicationsWithDeviation"
        }
      },
      "averageDaysToIssueOC": {
        "avg": {
          "field": "averageDaysToIssueOC"
        }
      },
      "averageDaysToIssuePermit": {
        "avg": {
          "field": "averageDaysToIssuePermit"
        }
      },
      "averageDeviation": {
        "avg": {
          "field": "averageDeviation"
        }
      },
      "ocIssued": {
        "avg": {
          "field": "ocIssued"
        }
      },
      "ocPlansScrutinized": {
        "avg": {
          "field": "ocPlansScrutinized"
        }
      },
      "ocSubmitted": {
        "avg": {
          "field": "ocSubmitted"
        }
      },
      "ocWithDeviation": {
        "avg": {
          "field": "ocWithDeviation"
        }
      },
      "plansScrutinized": {
        "avg": {
          "field": "plansScrutinized"
        }
      },
      "slaComplianceOC": {
        "avg": {
          "field": "slaComplianceOC"
        }
      },
      "slaCompliancePermit": {
        "avg": {
          "field": "slaCompliancePermit"
        }
      },
      "todaysClosedApplicationsOC": {
        "avg": {
          "field": "todaysClosedApplicationsOC"
        }
      },
      "todaysClosedApplicationsPermit": {
        "avg": {
          "field": "todaysClosedApplicationsPermit"
        }
      },
      "todaysCompletedApplicationsWithinSLAOC": {
        "avg": {
          "field": "todaysCompletedApplicationsWithinSLAOC"
        }
      },
      "todaysCompletedApplicationsWithinSLAPermit": {
        "avg": {
          "field": "todaysCompletedApplicationsWithinSLAPermit"
        }
      },
      "landAreaAppliedInSystemForBPA": {
        "sum": {
          "field": "landAreaAppliedInSystemForBPA"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval": {
        "sum": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "StipulatedDays": {
        "sum": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
    },
  "dest": {
    "index": "obps-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-ward-common/_start
GET obps-national-dashboard-ward/_search
GET obps-national-dashboard-ward/_count

//Transforms for monthly(new env)
//Transform 1(common)
POST _transform/obps-transform-month-common/_stop
PUT _transform/obps-transform-month-common
{
  "source": {
    "index": [
      "obps-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "applicationsSubmitted": {
        "sum": {
          "field": "applicationsSubmitted"
        }
      },
      "applicationsWithDeviation": {
        "sum": {
          "field": "applicationsWithDeviation"
        }
      },
      "averageDaysToIssueOC": {
        "avg": {
          "field": "averageDaysToIssueOC"
        }
      },
      "averageDaysToIssuePermit": {
        "avg": {
          "field": "averageDaysToIssuePermit"
        }
      },
      "averageDeviation": {
        "avg": {
          "field": "averageDeviation"
        }
      },
      "ocIssued": {
        "sum": {
          "field": "ocIssued"
        }
      },
      "ocPlansScrutinized": {
        "sum": {
          "field": "ocPlansScrutinized"
        }
      },
      "ocSubmitted": {
        "sum": {
          "field": "ocSubmitted"
        }
      },
      "ocWithDeviation": {
        "sum": {
          "field": "ocWithDeviation"
        }
      },
      "plansScrutinized": {
        "sum": {
          "field": "plansScrutinized"
        }
      },
      "slaComplianceOC": {
        "sum": {
          "field": "slaComplianceOC"
        }
      },
      "slaCompliancePermit": {
        "sum": {
          "field": "slaCompliancePermit"
        }
      },
      "todaysClosedApplicationsOC": {
        "sum": {
          "field": "todaysClosedApplicationsOC"
        }
      },
      "todaysClosedApplicationsPermit": {
        "sum": {
          "field": "todaysClosedApplicationsPermit"
        }
      },
      "todaysCompletedApplicationsWithinSLAOC": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLAOC"
        }
      },
      "todaysCompletedApplicationsWithinSLAPermit": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLAPermit"
        }
      },
      "landAreaAppliedInSystemForBPA": {
        "sum": {
          "field": "landAreaAppliedInSystemForBPA"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval": {
        "sum": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "StipulatedDays": {
        "sum": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
    },
  "dest": {
    "index": "obps-national-dashboard-month",
    "pipeline": "obps-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-month-common/_start
GET obps-national-dashboard-month/_search
GET obps-national-dashboard-month/_count


//Transform 2 (occupancytype)
POST _transform/obps-transform-month-occupancytype/_stop
PUT _transform/obps-transform-month-occupancytype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "occupancyType": {
        "terms": {
          "field": "occupancyType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForOccupancyType": {
        "sum": {
          "field": "permitsIssuedForOccupancyType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-month",
    "pipeline": "obps-pipeline-dashboard-occupancytype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-month-occupancytype/_start
GET obps-national-dashboard-month/_search
GET obps-national-dashboard-month/_count


//Transform 3  (paymentmode)
POST _transform/obps-transform-month-paymentmode/_stop
PUT _transform/obps-transform-month-paymentmode
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-month",
    "pipeline": "obps-pipeline-dashboard-paymentMode"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-month-paymentmode/_start
GET obps-national-dashboard-month/_search
GET obps-national-dashboard-month/_count


//Transform 4 (risktype)
POST _transform/obps-transform-month-risktype/_stop
PUT _transform/obps-transform-month-risktype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "riskType": {
        "terms": {
          "field": "riskType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForRiskType": {
        "sum": {
          "field": "permitsIssuedForRiskType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-month",
    "pipeline": "obps-pipeline-dashboard-risktype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-month-risktype/_start
GET obps-national-dashboard-month/_search
GET obps-national-dashboard-month/_count


//Transform 5 (sunoccupancytype)
POST _transform/obps-transform-month-suboccupancytype/_stop
PUT _transform/obps-transform-month-suboccupancytype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "subOccupancyType": {
        "terms": {
          "field": "subOccupancyType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForSubOccupancyType": {
        "sum": {
          "field": "permitsIssuedForSubOccupancyType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-month",
    "pipeline": "obps-pipeline-dashboard-suboccupancytype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-month-suboccupancytype/_start
GET obps-national-dashboard-month/_search
GET obps-national-dashboard-month/_count


//Transforms for weekly
//Transform 1(common)
POST _transform/obps-transform-week-common/_stop
PUT _transform/obps-transform-week-common
{
  "source": {
    "index": [
      "obps-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "applicationsSubmitted": {
        "sum": {
          "field": "applicationsSubmitted"
        }
      },
      "applicationsWithDeviation": {
        "sum": {
          "field": "applicationsWithDeviation"
        }
      },
      "averageDaysToIssueOC": {
        "avg": {
          "field": "averageDaysToIssueOC"
        }
      },
      "averageDaysToIssuePermit": {
        "avg": {
          "field": "averageDaysToIssuePermit"
        }
      },
      "averageDeviation": {
        "avg": {
          "field": "averageDeviation"
        }
      },
      "ocIssued": {
        "sum": {
          "field": "ocIssued"
        }
      },
      "ocPlansScrutinized": {
        "sum": {
          "field": "ocPlansScrutinized"
        }
      },
      "ocSubmitted": {
        "sum": {
          "field": "ocSubmitted"
        }
      },
      "ocWithDeviation": {
        "sum": {
          "field": "ocWithDeviation"
        }
      },
      "plansScrutinized": {
        "sum": {
          "field": "plansScrutinized"
        }
      },
      "slaComplianceOC": {
        "sum": {
          "field": "slaComplianceOC"
        }
      },
      "slaCompliancePermit": {
        "sum": {
          "field": "slaCompliancePermit"
        }
      },
      "todaysClosedApplicationsOC": {
        "sum": {
          "field": "todaysClosedApplicationsOC"
        }
      },
      "todaysClosedApplicationsPermit": {
        "sum": {
          "field": "todaysClosedApplicationsPermit"
        }
      },
      "todaysCompletedApplicationsWithinSLAOC": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLAOC"
        }
      },
      "todaysCompletedApplicationsWithinSLAPermit": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLAPermit"
        }
      },
      "landAreaAppliedInSystemForBPA": {
        "sum": {
          "field": "landAreaAppliedInSystemForBPA"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval": {
        "sum": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "StipulatedDays": {
        "sum": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
    },
  "dest": {
    "index": "obps-national-dashboard-week",
    "pipeline": "obps-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-week-common/_start
GET obps-national-dashboard-week/_search
GET obps-national-dashboard-week/_count


//Transform 2 (occupancytype)
POST _transform/obps-transform-week-occupancytype/_stop
PUT _transform/obps-transform-week-occupancytype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "occupancyType": {
        "terms": {
          "field": "occupancyType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForOccupancyType": {
        "sum": {
          "field": "permitsIssuedForOccupancyType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-week",
    "pipeline": "obps-pipeline-dashboard-occupancytype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-week-occupancytype/_start
GET obps-national-dashboard-week/_search
GET obps-national-dashboard-week/_count

//Transform 3 (paymentmode)
POST _transform/obps-transform-week-paymentmode/_stop
PUT _transform/obps-transform-week-paymentmode
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-week",
    "pipeline": "obps-pipeline-dashboard-paymentMode"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-week-paymentmode/_start
GET obps-national-dashboard-week/_search
GET obps-national-dashboard-week/_count

//Transform 4 (risktype)
POST _transform/obps-transform-week-risktype/_stop
PUT _transform/obps-transform-week-risktype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "riskType": {
        "terms": {
          "field": "riskType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForRiskType": {
        "sum": {
          "field": "permitsIssuedForRiskType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-week",
    "pipeline": "obps-pipeline-dashboard-risktype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-week-risktype/_start
GET obps-national-dashboard-week/_search
GET obps-national-dashboard-week/_count


//Transform 5 (sunoccupancytype)
POST _transform/obps-transform-week-suboccupancytype/_stop
PUT _transform/obps-transform-week-suboccupancytype
{
  "source": {
    "index": [
      "obps-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "subOccupancyType": {
        "terms": {
          "field": "subOccupancyType.keyword"
        }
      }
    },
    "aggregations": {
      "permitsIssuedForSubOccupancyType": {
        "sum": {
          "field": "permitsIssuedForSubOccupancyType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "obps-national-dashboard-week",
    "pipeline": "obps-pipeline-dashboard-suboccupancytype"
  },
  "frequency": "1m"
}
POST _transform/obps-transform-week-suboccupancytype/_start
GET obps-national-dashboard-week/_search
GET obps-national-dashboard-week/_count

GET obps-national-dashboard-ward/_count
GET obps-national-dashboard-week/_count
GET obps-national-dashboard-month/_count


//PT-------------------------------------------------------------
GET pt-national-dashboard/_count
GET pt-national-dashboard-backup/_count
GET pt-national-dashboard-temp1/_count

GET pt-national-dashboard
GET pt-national-dashboard-backup
GET pt-national-dashboard-temp1

POST _reindex
{
  "source": {
    "index": "pt-national-dashboard"
  },
  "dest": {
    "index": "pt-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "pt-national-dashboard"
  },
  "dest": {
    "index": "pt-national-dashboard-temp1",
     "pipeline": "add_timestamp_pipeline"
   }
}

GET pt-national-dashboard
PUT pt-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "applicationStatus": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "assessedPropertiesForUsageCategory": {
        "type": "long"
      },
      "assessments": {
        "type": "long"
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "cessForUsageCategory": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "financialYear": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "interestForFinancialYear": {
        "type": "long"
      },
      "interestForUsageCategory": {
        "type": "long"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "noOfPropertiesPaidToday": {
        "type": "long"
      },
      "paymentChannelType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "penaltyForUsageCategory": {
        "type": "long"
      },
      "propertiesRegisteredForFinancialYear": {
        "type": "long"
      },
      "propertiesRegisteredForUsageCategory": {
        "type": "long"
      },
      "propertyTaxForUsageCategory": {
        "type": "long"
      },
      "rebateForUsageCategory": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysApprovedApplications": {
        "type": "long"
      },
      "todaysApprovedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysClosedApplications": {
        "type": "long"
      },
      "todaysCollectionForPaymentChannelType": {
        "type": "long"
      },
      "todaysCollectionForUsageCategory": {
        "type": "long"
      },
      "todaysMovedApplicationsForApplicationStatus": {
        "type": "long"
      },
      "todaysTotalApplications": {
        "type": "long"
      },
      "transactionsForUsageCategory": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "usageCategory": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "pt-national-dashboard-temp1"
  },
  "dest": {
    "index": "pt-national-dashboard"
     }
}

GET pt-national-dashboard-month/_count
GET pt-national-dashboard-week/_count
GET pt-national-dashboard-ward-common/_count


//pipeline
GET _ingest/pipeline/pipeline-dashboard
PUT _ingest/pipeline/pipeline-dashboard
{
  "processors": [
    {
      "set": {
        "field": "cessForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "rebateForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "interestForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessedPropertiesForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactionsForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertyTaxForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "penaltyForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertiesRegisteredForFinancialYear",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    },
   {
      "set": {
        "field": "todaysMovedApplicationsForApplicationStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/pipeline-dashboard-usagecatagory
PUT _ingest/pipeline/pipeline-dashboard-usagecatagory
{
  "processors": [
    {
      "set": {
        "field": "propertiesRegisteredForFinancialYear",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "noOfPropertiesPaidToday",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessments",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
 {
      "set": {
        "field": "todaysMovedApplicationsForApplicationStatus:",
        "value": 0
      }
    },
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline:",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

//Pipeline 3 (FinancialYear)
GET _ingest/pipeline/pipeline-dashboard-financialyr
PUT _ingest/pipeline/pipeline-dashboard-financialyr
{
  "processors": [
    {
      "set": {
        "field": "cessForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "rebateForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "interestForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessedPropertiesForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactionsForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertyTaxForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "penaltyForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "noOfPropertiesPaidToday",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessments",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
 {
      "set": {
        "field": "todaysApplicationsWithinSLA:",
        "value": 0
      }
    },
 {
      "set": {
        "field": "todaysMovedApplications:",
        "value": 0
      }
    },
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline:",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    },
   {
      "set": {
        "field": "todaysMovedApplicationsForApplicationStatus",
        "value": 0
      }
    }
  ]
}

//Pipeline 4 (PaymentChannelType)
GET _ingest/pipeline/pipeline-dashboard-paymentChannelType
PUT _ingest/pipeline/pipeline-dashboard-paymentChannelType
{
  "processors": [
    {
      "set": {
        "field": "cessForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "rebateForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "interestForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessedPropertiesForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactionsForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertyTaxForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "penaltyForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "noOfPropertiesPaidToday",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessments",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
 
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline:",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertiesRegisteredForFinancialYear",
        "value": 0
      }
    },
   {
      "set": {
        "field": "todaysMovedApplicationsForApplicationStatus",
        "value": 0
      }
    }
  ]
}

//Pipeline 5 (ApplicationStatus)
GET _ingest/pipeline/pipeline-dashboard-applicationStatus
PUT _ingest/pipeline/pipeline-dashboard-applicationStatus
{
  "processors": [
    {
      "set": {
        "field": "cessForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "rebateForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "interestForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessedPropertiesForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactionsForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertyTaxForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "penaltyForUsageCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "noOfPropertiesPaidToday",
        "value": 0
      }
    },
    {
      "set": {
        "field": "assessments",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "propertiesRegisteredForFinancialYear",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    }
  ]
}

//TRANSFORMAERS
//Transform for removing ward level duplicates
POST _transform/pt-transform-ward-common/_stop
GET _transform/pt-transform-ward-common
PUT _transform/pt-transform-ward-common
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysClosedApplications": {
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysTotalApplications": {
        "avg": {
          "field": "todaysTotalApplications"
        }
      },
      "noOfPropertiesPaidToday": {
        "avg": {
          "field": "noOfPropertiesPaidToday"
        }
      },
      "assessments": {
        "avg": {
          "field": "assessments"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplications": {
        "avg": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-ward-common",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/pt-transform-ward-common/_start
GET pt-national-dashboard-ward-common/_search
GET pt-national-dashboard-ward-common/_count

POST _transform/pt-1-transform-week-common/_stop
GET _transform/pt-1-transform-week-common
PUT _transform/pt-1-transform-week-common
{
  "source": {
    "index": [
      "pt-national-dashboard-ward-common"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysTotalApplications": {
        "sum": {
          "field": "todaysTotalApplications"
        }
      },
      "noOfPropertiesPaidToday": {
        "sum": {
          "field": "noOfPropertiesPaidToday"
        }
      },
      "assessments": {
        "sum": {
          "field": "assessments"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
 "todaysApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApplicationsWithinSLA"
        }
      },
 "todaysMovedApplications": {
        "avg": {
          "field": "todaysMovedApplications"
        }
      },
 "pendingApplicationsBeyondTimeline": {
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard"
  },
  "frequency": "1m" 
}
POST _transform/pt-1-transform-week-common/_start
GET pt-national-dashboard-week/_count

POST _transform/pt-1-transform-week-usagecategory/_stop
GET _transform/pt-1-transform-week-usagecategory
PUT _transform/pt-1-transform-week-usagecategory
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "usageCategory": {
        "terms": {
          "field": "usageCategory.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "cessForUsageCategory": {
        "sum": {
          "field": "cessForUsageCategory"
        }
      },
      "rebateForUsageCategory": {
        "sum": {
          "field": "rebateForUsageCategory"
        }
      },
      "interestForUsageCategory": {
        "sum": {
          "field": "interestForUsageCategory"
        }
      },
      "assessedPropertiesForUsageCategory": {
        "sum": {
          "field": "assessedPropertiesForUsageCategory"
        }
      },
      "transactionsForUsageCategory": {
        "sum": {
          "field": "transactionsForUsageCategory"
        }
      },
      "todaysCollectionForUsageCategory": {
        "sum": {
          "field": "todaysCollectionForUsageCategory"
        }
      },
      "propertyTaxForUsageCategory": {
        "sum": {
          "field": "propertyTaxForUsageCategory"
        }
      },
      "penaltyForUsageCategory": {
        "sum": {
          "field": "penaltyForUsageCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard-usagecatagory"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-week-usagecategory/_start
GET pt-national-dashboard-week/_count

POST _transform/pt-1-transform-week-financialyr/_stop
GET _transform/pt-1-transform-week-financialyr
PUT _transform/pt-1-transform-week-financialyr
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "financialYear": {
        "terms": {
          "field": "financialYear.keyword"
        }
      }
    },
    "aggregations": {
       "propertiesRegisteredForFinancialYear": {
        "sum": {
          "field": "propertiesRegisteredForFinancialYear"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard-financialyr"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-week-financialyr/_start
GET pt-national-dashboard-week/_count

POST _transform/pt-1-transform-week-paymentchanneltype/_stop
GET  _transform/pt-1-transform-week-paymentchanneltype
PUT _transform/pt-1-transform-week-paymentchanneltype
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
       "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard-paymentChannelType"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-week-paymentchanneltype/_start
GET pt-national-dashboard-week/_count

//Transform 5 (Application status)
GET _transform/pt-1-transform-week-applicationstatus
PUT _transform/pt-1-transform-week-applicationstatus
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "applicationStatus": {
        "terms": {
          "field": "applicationStatus.keyword"
        }
      }
    },
    "aggregations": {
       "todaysMovedApplicationsForApplicationStatus": {
        "sum": {
          "field": "todaysMovedApplicationsForApplicationStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard-applicationStatus"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-week-applicationstatus/_start
GET pt-national-dashboard-week/_count

//month
POST _transform/pt-1-transform-month-common/_stop
GET _transform/pt-1-transform-month-common
PUT _transform/pt-1-transform-month-common
{
  "source": {
    "index": [
      "pt-national-dashboard-ward-common"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysTotalApplications": {
        "sum": {
          "field": "todaysTotalApplications"
        }
      },
      "noOfPropertiesPaidToday": {
        "sum": {
          "field": "noOfPropertiesPaidToday"
        }
      },
      "assessments": {
        "sum": {
          "field": "assessments"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
 "todaysApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApplicationsWithinSLA"
        }
      },
 "todaysMovedApplications": {
        "avg": {
          "field": "todaysMovedApplications"
        }
      },
 "pendingApplicationsBeyondTimeline": {
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-month",
    "pipeline": "pipeline-dashboard"
  },
  "frequency": "1m" 
}
POST _transform/pt-1-transform-month-common/_start
GET pt-national-dashboard-month/_count


POST _transform/pt-1-transform-month-usagecategory/_stop
GET _transform/pt-1-transform-month-usagecategory
PUT _transform/pt-1-transform-month-usagecategory
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "usageCategory": {
        "terms": {
          "field": "usageCategory.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "cessForUsageCategory": {
        "sum": {
          "field": "cessForUsageCategory"
        }
      },
      "rebateForUsageCategory": {
        "sum": {
          "field": "rebateForUsageCategory"
        }
      },
      "interestForUsageCategory": {
        "sum": {
          "field": "interestForUsageCategory"
        }
      },
      "assessedPropertiesForUsageCategory": {
        "sum": {
          "field": "assessedPropertiesForUsageCategory"
        }
      },
      "transactionsForUsageCategory": {
        "sum": {
          "field": "transactionsForUsageCategory"
        }
      },
      "todaysCollectionForUsageCategory": {
        "sum": {
          "field": "todaysCollectionForUsageCategory"
        }
      },
      "propertyTaxForUsageCategory": {
        "sum": {
          "field": "propertyTaxForUsageCategory"
        }
      },
      "penaltyForUsageCategory": {
        "sum": {
          "field": "penaltyForUsageCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-month",
    "pipeline": "pipeline-dashboard-usagecatagory"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-month-usagecategory/_start
GET pt-national-dashboard-month/_count

POST _transform/pt-1-transform-month-financialyr/_stop
GET _transform/pt-1-transform-month-financialyr
PUT _transform/pt-1-transform-month-financialyr
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "financialYear": {
        "terms": {
          "field": "financialYear.keyword"
        }
      }
    },
    "aggregations": {
       "propertiesRegisteredForFinancialYear": {
        "sum": {
          "field": "propertiesRegisteredForFinancialYear"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-month",
    "pipeline": "pipeline-dashboard-financialyr"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-month-financialyr/_start
GET pt-national-dashboard-month/_count

POST _transform/pt-1-transform-month-paymentchanneltype/_stop
GET _transform/pt-1-transform-month-paymentchanneltype
PUT _transform/pt-1-transform-month-paymentchanneltype
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
       "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-month",
    "pipeline": "pipeline-dashboard-paymentChannelType"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-month-paymentchanneltype/_start
GET pt-national-dashboard-month/_count

POST _transform/pt-1-transform-month-applicationstatus/_stop
GET _transform/pt-1-transform-month-applicationstatus
PUT _transform/pt-1-transform-month-applicationstatus
{
  "source": {
    "index": [
      "pt-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "applicationStatus": {
        "terms": {
          "field": "applicationStatus.keyword"
        }
      }
    },
    "aggregations": {
       "todaysMovedApplicationsForApplicationStatus": {
        "sum": {
          "field": "todaysMovedApplicationsForApplicationStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "pt-national-dashboard-week",
    "pipeline": "pipeline-dashboard-applicationStatus"
  },
  "frequency": "1m"
}
POST _transform/pt-1-transform-month-applicationstatus/_start
GET pt-national-dashboard-month/_count


GET pt-national-dashboard-month/_count
GET pt-national-dashboard-week/_count
GET pt-national-dashboard-ward-common/_count


//MCOLLECT----------------------------------------------------------

GET mcollect-national-dashboard/_count
GET mcollect-national-dashboard-backup/_count
GET mcollect-national-dashboard-temp/_count

GET mcollect-national-dashboard
GET mcollect-national-dashboard-backup
GET mcollect-national-dashboard-temp

POST _reindex
{
  "source": {
    "index": "mcollect-national-dashboard"
  },
  "dest": {
    "index": "mcollect-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "mcollect-national-dashboard"
  },
  "dest": {
    "index": "mcollect-national-dashboard-temp",
     "pipeline": "add_timestamp_pipeline"
   }
}

GET mcollect-national-dashboard
PUT mcollect-national-dashboard
{
  "mappings": {
    "properties": {
      "category": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "challanStatus": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "numberOfCategories": {
        "type": "long"
      },
      "numberOfChallansForCategory": {
        "type": "long"
      },
      "numberOfChallansForChallanStatus": {
        "type": "long"
      },
      "numberOfReceiptsForCategory": {
        "type": "long"
      },
      "numberOfReceiptsForPaymentMode": {
        "type": "long"
      },
      "numberOfReceiptsForStatus": {
        "type": "long"
      },
      "paymentMode": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "status": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysCollectionForCategory": {
        "type": "long"
      },
      "todaysCollectionForPaymentMode": {
        "type": "long"
      },
      "todaysCollectionForStatus": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "mcollect-national-dashboard-temp"
  },
  "dest": {
    "index": "mcollect-national-dashboard"
     }
}

GET mcollect-national-dashboard-ward/_count
GET mcollect-national-dashboard-week/_count
GET mcollect-national-dashboard-month/_count

//PIPELINE
GET _ingest/pipeline/mcollect-pipeline-dashboard-common
PUT _ingest/pipeline/mcollect-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "numberOfChallansForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForChallanStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/mcollect-pipeline-dashboard-category
PUT _ingest/pipeline/mcollect-pipeline-dashboard-category
{
  "processors": [
    {
      "set": {
        "field": "numberOfCategories",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForChallanStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForStatus",
        "value": 0
      }
    },
   {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/mcollect-pipeline-dashboard-challanstatus
PUT _ingest/pipeline/mcollect-pipeline-dashboard-challanstatus
{
  "processors": [
    {
      "set": {
        "field": "numberOfCategories",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/mcollect-pipeline-dashboard-paymentmode
PUT _ingest/pipeline/mcollect-pipeline-dashboard-paymentmode
{
  "processors": [
    {
      "set": {
        "field": "numberOfCategories",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForChallanStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForStatus",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/mcollect-pipeline-dashboard-status
PUT _ingest/pipeline/mcollect-pipeline-dashboard-status
{
  "processors": [
    {
      "set": {
        "field": "numberOfCategories",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForCategory",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfChallansForChallanStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfReceiptsForPaymentMode",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentMode",
        "value": 0
      }
    }
  ]
}

//TRANSFORMERS
POST _transform/mcollect-transform-ward-common/_stop
GET _transform/mcollect-transform-ward-common
PUT _transform/mcollect-transform-ward-common
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCategories": {
        "avg": {
          "field": "numberOfCategories"
        }
      },
      "pendingApplicationsBeyondTimeline": {
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-ward-common/_start
GET mcollect-national-dashboard-ward/_search
GET mcollect-national-dashboard-ward/_count

POST _transform/mcollect-transform-month-common/_stop
GET _transform/mcollect-transform-month-common
PUT _transform/mcollect-transform-month-common
{
  "source": {
    "index": [
      "mcollect-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "numberOfCategories": {
        "sum": {
          "field": "numberOfCategories"
        }
      },
     "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-month",
    "pipeline": "mcollect-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-month-common/_start
GET mcollect-national-dashboard-month/_search
GET mcollect-national-dashboard-month/_count

POST _transform/mcollect-transform-month-category/_stop
GET _transform/mcollect-transform-month-category
PUT _transform/mcollect-transform-month-category
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "category": {
        "terms": {
          "field": "category.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfChallansForCategory": {
        "sum": {
          "field": "numberOfChallansForCategory"
        }
      },"numberOfReceiptsForCategory": {
        "sum": {
          "field": "numberOfReceiptsForCategory"
        }
      },"todaysCollectionForCategory": {
        "sum": {
          "field": "todaysCollectionForCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-month",
    "pipeline": "mcollect-pipeline-dashboard-category"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-month-category/_start
GET mcollect-national-dashboard-month/_search
GET mcollect-national-dashboard-month/_count

POST _transform/mcollect-transform-month-challanstatus/_stop
GET _transform/mcollect-transform-month-challanstatus
PUT _transform/mcollect-transform-month-challanstatus
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "challanStatus": {
        "terms": {
          "field": "challanStatus.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfChallansForChallanStatus": {
        "sum": {
          "field": "numberOfChallansForChallanStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-month",
    "pipeline": "mcollect-pipeline-dashboard-challanstatus"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-month-challanstatus/_start
GET mcollect-national-dashboard-month/_search
GET mcollect-national-dashboard-month/_count

POST _transform/mcollect-transform-month-paymentmode/_stop
GET _transform/mcollect-transform-month-paymentmode
PUT _transform/mcollect-transform-month-paymentmode
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfReceiptsForPaymentMode": {
        "sum": {
          "field": "numberOfReceiptsForPaymentMode"
        }
      },
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-month",
    "pipeline": "mcollect-pipeline-dashboard-paymentmode"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-month-paymentmode/_start
GET mcollect-national-dashboard-month/_search
GET mcollect-national-dashboard-month/_count

POST _transform/mcollect-transform-month-status/_stop
GET _transform/mcollect-transform-month-status
PUT _transform/mcollect-transform-month-status
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "status": {
        "terms": {
          "field": "status.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfReceiptsForStatus": {
        "sum": {
          "field": "numberOfReceiptsForStatus"
        }
      },
      "todaysCollectionForStatus": {
        "sum": {
          "field": "todaysCollectionForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-month",
    "pipeline": "mcollect-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-month-status/_start
GET mcollect-national-dashboard-month/_search
GET mcollect-national-dashboard-month/_count

POST _transform/mcollect-transform-week-common/_stop
GET _transform/mcollect-transform-week-common
PUT _transform/mcollect-transform-week-common
{
  "source": {
    "index": [
      "mcollect-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "numberOfCategories": {
        "sum": {
          "field": "numberOfCategories"
        }
      },
     "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-week",
    "pipeline": "mcollect-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-week-common/_start
GET mcollect-national-dashboard-week/_search
GET mcollect-national-dashboard-week/_count

POST _transform/mcollect-transform-week-category/_stop
GET _transform/mcollect-transform-week-category
PUT _transform/mcollect-transform-week-category
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "category": {
        "terms": {
          "field": "category.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfChallansForCategory": {
        "sum": {
          "field": "numberOfChallansForCategory"
        }
      },"numberOfReceiptsForCategory": {
        "sum": {
          "field": "numberOfReceiptsForCategory"
        }
      },"todaysCollectionForCategory": {
        "sum": {
          "field": "todaysCollectionForCategory"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-week",
    "pipeline": "mcollect-pipeline-dashboard-category"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-week-category/_start
GET mcollect-national-dashboard-week/_search
GET mcollect-national-dashboard-week/_count

POST _transform/mcollect-transform-week-challanstatus/_stop
GET _transform/mcollect-transform-week-challanstatus
PUT _transform/mcollect-transform-week-challanstatus
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "challanStatus": {
        "terms": {
          "field": "challanStatus.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfChallansForChallanStatus": {
        "sum": {
          "field": "numberOfChallansForChallanStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-week",
    "pipeline": "mcollect-pipeline-dashboard-challanstatus"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-week-challanstatus/_start
GET mcollect-national-dashboard-week/_search
GET mcollect-national-dashboard-week/_count

POST _transform/mcollect-transform-week-paymentmode/_stop
GET _transform/mcollect-transform-week-paymentmode
PUT _transform/mcollect-transform-week-paymentmode
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentMode": {
        "terms": {
          "field": "paymentMode.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfReceiptsForPaymentMode": {
        "sum": {
          "field": "numberOfReceiptsForPaymentMode"
        }
      },
      "todaysCollectionForPaymentMode": {
        "sum": {
          "field": "todaysCollectionForPaymentMode"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-week",
    "pipeline": "mcollect-pipeline-dashboard-paymentmode"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-week-paymentmode/_start
GET mcollect-national-dashboard-week/_search
GET mcollect-national-dashboard-week/_count

POST _transform/mcollect-transform-week-status/_stop
GET _transform/mcollect-transform-week-status
PUT _transform/mcollect-transform-week-status
{
  "source": {
    "index": [
      "mcollect-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "status": {
        "terms": {
          "field": "status.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfReceiptsForStatus": {
        "sum": {
          "field": "numberOfReceiptsForStatus"
        }
      },
      "todaysCollectionForStatus": {
        "sum": {
          "field": "todaysCollectionForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "mcollect-national-dashboard-week",
    "pipeline": "mcollect-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/mcollect-transform-week-status/_start
GET mcollect-national-dashboard-week/_search
GET mcollect-national-dashboard-week/_count

GET mcollect-national-dashboard-ward/_count
GET mcollect-national-dashboard-week/_count
GET mcollect-national-dashboard-month/_count


//TL--------------------------------------------------------------------

GET tl-national-dashboard/_count
GET tl-national-dashboard-backup/_count
GET tl-national-dashboard-temp/_count

GET tl-national-dashboard
GET tl-national-dashboard-backup
GET tl-national-dashboard-temp

POST _reindex
{
  "source": {
    "index": "tl-national-dashboard"
  },
  "dest": {
    "index": "tl-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "tl-national-dashboard"
  },
  "dest": {
    "index": "tl-national-dashboard-temp",
     "pipeline": "add_timestamp_pipeline"
   }
}

GET tl-national-dashboard
PUT tl-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "adhocPenalty": {
        "type": "long"
      },
      "adhocRebate": {
        "type": "long"
      },
      "applicationsMovedTodayForStatus": {
        "type": "long"
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "module": {
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
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "status": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "tlTax": {
        "type": "long"
      },
      "todaysApplications": {
        "type": "long"
      },
      "todaysApprovedApplications": {
        "type": "long"
      },
      "todaysApprovedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysCollectionForPaymentChannelType": {
        "type": "long"
      },
      "todaysCollectionForTradeType": {
        "type": "long"
      },
      "todaysLicenseIssuedWithinSLA": {
        "type": "long"
      },
      "todaysTradeLicensesForStatus": {
        "type": "long"
      },
      "tradeType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "transactions": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "tl-national-dashboard-temp"
  },
  "dest": {
    "index": "tl-national-dashboard"
     }
}

GET tl-national-dashboard-week/_count
GET tl-national-dashboard-month/_count
//GET tl-national-dashboard-ward/_count
GET tl-national-dashboard-ward-common/_count



//PIPELINE
GET _ingest/pipeline/tl-pipeline-dashboard-common
PUT _ingest/pipeline/tl-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "todaysCollectionForTradeType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsMovedTodayForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTradeLicensesForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/tl-pipeline-dashboard-status
PUT _ingest/pipeline/tl-pipeline-dashboard-status
{
  "processors": [
    {
      "set": {
        "field": "todaysApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocPenalty",
        "value": 0
      }
    },
    {
      "set": {
        "field": "tlTax",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocRebate",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysLicenseIssuedWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTradeType",
        "value": 0
      }
    },
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/tl-pipeline-dashboard-tradetype
PUT _ingest/pipeline/tl-pipeline-dashboard-tradetype
{
  "processors": [
    {
      "set": {
        "field": "todaysApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocPenalty",
        "value": 0
      }
    },
    {
      "set": {
        "field": "tlTax",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocRebate",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysLicenseIssuedWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsMovedTodayForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTradeLicensesForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    },
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/tl-pipeline-dashboard-paymentchanneltype
PUT _ingest/pipeline/tl-pipeline-dashboard-paymentchanneltype
{
  "processors": [
    {
      "set": {
        "field": "todaysApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocPenalty",
        "value": 0
      }
    },
    {
      "set": {
        "field": "tlTax",
        "value": 0
      }
    },
    {
      "set": {
        "field": "adhocRebate",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysLicenseIssuedWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "applicationsMovedTodayForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTradeLicensesForStatus",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTradeType",
        "value": 0
      }
    },
 {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    }
  ]
}

//TRANSFORMERS
POST _transform/tl-transform-ward-common/_stop
GET _transform/tl-transform-ward-common
PUT _transform/tl-transform-ward-common
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysApplications": {
        "avg": {
          "field": "todaysApplications"
        }
      },
      "adhocPenalty": {
        "avg": {
          "field": "adhocPenalty"
        }
      },
      "tlTax": {
        "avg": {
          "field": "tlTax"
        }
      },
      "adhocRebate": {
        "avg": {
          "field": "adhocRebate"
        }
      },
      "todaysLicenseIssuedWithinSLA": {
        "avg": {
          "field": "todaysLicenseIssuedWithinSLA"
        }
      },
      "transactions": {
        "avg": {
          "field": "transactions"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
 "pendingApplicationsBeyondTimeline": {
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "avg": {
          "field": "todaysApprovedApplications"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-ward-common",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-ward-common/_start
GET tl-national-dashboard-ward-common/_count

POST _transform/tl-transform-month-common/_stop
GET _transform/tl-transform-month-common
PUT _transform/tl-transform-month-common
{
  "source": {
    "index": [
      "tl-national-dashboard-ward-common"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysApplications": {
        "sum": {
          "field": "todaysApplications"
        }
      },
      "adhocPenalty": {
        "sum": {
          "field": "adhocPenalty"
        }
      },
      "tlTax": {
        "sum": {
          "field": "tlTax"
        }
      },
      "adhocRebate": {
        "sum": {
          "field": "adhocRebate"
        }
      },
      "todaysLicenseIssuedWithinSLA": {
        "sum": {
          "field": "todaysLicenseIssuedWithinSLA"
        }
      },
      "transactions": {
        "sum": {
          "field": "transactions"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
  "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-month",
    "pipeline": "tl-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-month-common/_start
GET tl-national-dashboard-month/_count

POST _transform/tl-transform-month-status/_stop
GET _transform/tl-transform-month-status
PUT _transform/tl-transform-month-status
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "status": {
        "terms": {
          "field": "status.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "applicationsMovedTodayForStatus": {
        "sum": {
          "field": "applicationsMovedTodayForStatus"
        }
      },
      "todaysTradeLicensesForStatus": {
        "sum": {
          "field": "todaysTradeLicensesForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-month",
    "pipeline": "tl-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-month-status/_start
GET tl-national-dashboard-month/_search
GET tl-national-dashboard-month/_count

POST _transform/tl-transform-month-tradetype/_stop
GET _transform/tl-transform-month-tradetype
PUT _transform/tl-transform-month-tradetype
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
     "tradeType": {
        "terms": {
          "field": "tradeType.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForTradeType": {
        "sum": {
          "field": "todaysCollectionForTradeType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-month",
    "pipeline": "tl-pipeline-dashboard-tradetype"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-month-tradetype/_start
GET tl-national-dashboard-month/_search
GET tl-national-dashboard-month/_count

POST _transform/tl-transform-month-paymentchanneltype/_stop
GET _transform/tl-transform-month-paymentchanneltype
PUT _transform/tl-transform-month-paymentchanneltype
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
     "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-month",
    "pipeline": "tl-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-month-paymentchanneltype/_start
GET tl-national-dashboard-month/_search
GET tl-national-dashboard-month/_count

POST _transform/tl-transform-week-common/_stop
GET _transform/tl-transform-week-common
PUT _transform/tl-transform-week-common
{
  "source": {
    "index": [
      "tl-national-dashboard-ward-common"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "todaysApplications": {
        "sum": {
          "field": "todaysApplications"
        }
      },
      "adhocPenalty": {
        "sum": {
          "field": "adhocPenalty"
        }
      },
      "tlTax": {
        "sum": {
          "field": "tlTax"
        }
      },
      "adhocRebate": {
        "sum": {
          "field": "adhocRebate"
        }
      },
      "todaysLicenseIssuedWithinSLA": {
        "sum": {
          "field": "todaysLicenseIssuedWithinSLA"
        }
      },
      "transactions": {
        "sum": {
          "field": "transactions"
        }
      },
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval": {
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
      "todaysApprovedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      },
  "pendingApplicationsBeyondTimeline": {
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "todaysApprovedApplications": {
        "sum": {
          "field": "todaysApprovedApplications"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-week",
    "pipeline": "tl-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-week-common/_start
GET tl-national-dashboard-week/_search
GET tl-national-dashboard-week/_count

POST _transform/tl-transform-week-status/_stop
GET _transform/tl-transform-week-status
PUT _transform/tl-transform-week-status
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "status": {
        "terms": {
          "field": "status.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "applicationsMovedTodayForStatus": {
        "sum": {
          "field": "applicationsMovedTodayForStatus"
        }
      },
      "todaysTradeLicensesForStatus": {
        "sum": {
          "field": "todaysTradeLicensesForStatus"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-week",
    "pipeline": "tl-pipeline-dashboard-status"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-week-status/_start
GET tl-national-dashboard-week/_search
GET tl-national-dashboard-week/_count

post _transform/tl-transform-week-tradetype/_stop
GET _transform/tl-transform-week-tradetype
PUT _transform/tl-transform-week-tradetype
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
     "tradeType": {
        "terms": {
          "field": "tradeType.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForTradeType": {
        "sum": {
          "field": "todaysCollectionForTradeType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-week",
    "pipeline": "tl-pipeline-dashboard-tradetype"
  },
  "frequency": "1m"
}
post _transform/tl-transform-week-tradetype/_start
GET tl-national-dashboard-week/_search
GET tl-national-dashboard-week/_count

POST _transform/tl-transform-week-paymentchanneltype/_stop
GET _transform/tl-transform-week-paymentchanneltype
PUT _transform/tl-transform-week-paymentchanneltype
{
  "source": {
    "index": [
      "tl-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
     "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "tl-national-dashboard-week",
    "pipeline": "tl-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/tl-transform-week-paymentchanneltype/_start
GET tl-national-dashboard-week/_search
GET tl-national-dashboard-week/_count

GET tl-national-dashboard-week/_count
GET tl-national-dashboard-month/_count
GET tl-national-dashboard-ward-common/_count



//WS-------------------------------------------------------------------------------------
GET ws-national-dashboard/_count
GET ws-national-dashboard-backup/_count
GET ws-national-dashboard-temp/_count

GET ws-national-dashboard
GET ws-national-dashboard-backup
GET ws-national-dashboard-temp

POST _reindex
{
  "source": {
    "index": "ws-national-dashboard"
  },
  "dest": {
    "index": "ws-national-dashboard-backup"
  }
}

POST _reindex
{
  "source": {
    "index": "ws-national-dashboard"
  },
  "dest": {
    "index": "ws-national-dashboard-temp",
     "pipeline": "add_timestamp_pipeline"
   }
}

GET ws-national-dashboard
PUT ws-national-dashboard
{
  "mappings": {
    "properties": {
      "StipulatedDays": {
        "type": "long"
      },
      "avgDaysForApplicationApproval": {
        "type": "long"
      },
      "channelType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "connectionType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "connectionsCreatedForChannelType": {
        "type": "long"
      },
      "connectionsCreatedForConnectionType": {
        "type": "long"
      },
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "duration": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "meterType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "module": {
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
      },
      "pendingApplicationsBeyondTimeline": {
        "type": "long"
      },
      "pendingConnectionsForDuration": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "sewerageConnectionsForChannelType": {
        "type": "long"
      },
      "sewerageConnectionsForUsageType": {
        "type": "long"
      },
      "slaCompliance": {
        "type": "long"
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "taxHeads": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "todaysClosedApplications": {
        "type": "long"
      },
      "todaysCollectionForConnectionType": {
        "type": "long"
      },
      "todaysCollectionForPaymentChannelType": {
        "type": "long"
      },
      "todaysCollectionForTaxHeads": {
        "type": "long"
      },
      "todaysCollectionForUsageType": {
        "type": "long"
      },
      "todaysCompletedApplicationsWithinSLA": {
        "type": "long"
      },
      "todaysTotalApplications": {
        "type": "long"
      },
      "transactions": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "usageType": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "waterConnectionsForChannelType": {
        "type": "long"
      },
      "waterConnectionsForMeterType": {
        "type": "long"
      },
      "waterConnectionsForUsageType": {
        "type": "long"
      }
    }
  }
}

POST _reindex
{
  "source": {
    "index": "ws-national-dashboard-temp"
  },
  "dest": {
    "index": "ws-national-dashboard"
     }
}


GET ws-national-dashboard-ward/_count
GET ws-national-dashboard-week/_count
GET ws-national-dashboard-month/_count


//PIPELINES
GET _ingest/pipeline/ws-pipeline-dashboard-common
PUT _ingest/pipeline/ws-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-connectiontype
PUT _ingest/pipeline/ws-pipeline-dashboard-connectiontype
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-channeltype
PUT _ingest/pipeline/ws-pipeline-dashboard-channeltype
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-usagetype
PUT _ingest/pipeline/ws-pipeline-dashboard-usagetype
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-metertype
PUT _ingest/pipeline/ws-pipeline-dashboard-metertype
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-duration
PUT _ingest/pipeline/ws-pipeline-dashboard-duration
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-taxheads
PUT _ingest/pipeline/ws-pipeline-dashboard-taxheads
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForPaymentChannelType",
        "value": 0
      }
    }
  ]
}

GET _ingest/pipeline/ws-pipeline-dashboard-paymentchanneltype
PUT _ingest/pipeline/ws-pipeline-dashboard-paymentchanneltype
{
  "processors": [
    {
      "set": {
        "field": "transactions",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaCompliance",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysTotalApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysClosedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCompletedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForConnectionType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "connectionsCreatedForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForChannelType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "sewerageConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForUsageType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "waterConnectionsForMeterType",
        "value": 0
      }
    },
    {
      "set": {
        "field": "pendingConnectionsForDuration",
        "value": 0
      }
    },
  {
      "set": {
        "field": "pendingApplicationsBeyondTimeline",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForTaxHeads",
        "value": 0
      }
    }
  ]
}

//TRANSFORMERS
POST _transform/ws-transform-ward-common/_stop
GET _transform/ws-transform-ward-common
PUT _transform/ws-transform-ward-common
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
       "ward": {
        "terms": {
          "field": "ward.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "transactions": {
        "avg": {
          "field": "transactions"
        }
      },
      "slaCompliance": {
        "avg": {
          "field": "slaCompliance"
        }
      },
      "todaysTotalApplications": {
        "avg": {
          "field": "todaysTotalApplications"
        }
      },
      "todaysClosedApplications": {
        "avg": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "avg": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
 "pendingApplicationsBeyondTimeline":{
        "avg": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-ward",
    "pipeline":"add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-ward-common/_start
GET ws-national-dashboard-ward/_search
GET ws-national-dashboard-ward/_count

POST _transform/ws-transform-month-common/_stop
GET _transform/ws-transform-month-common
PUT _transform/ws-transform-month-common
{
  "source": {
    "index": [
      "ws-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "transactions": {
        "sum": {
          "field": "transactions"
        }
      },
      "slaCompliance": {
        "sum": {
          "field": "slaCompliance"
        }
      },
      "todaysTotalApplications": {
        "sum": {
          "field": "todaysTotalApplications"
        }
      },
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
  "pendingApplicationsBeyondTimeline":{
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
      },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-common/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-connectiontype/_stop
GET _transform/ws-transform-month-connectiontype
PUT _transform/ws-transform-month-connectiontype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "connectionType": {
        "terms": {
          "field": "connectionType.keyword"
        }
      }
    },
    "aggregations": {
      "connectionsCreatedForConnectionType": {
        "sum": {
          "field": "connectionsCreatedForConnectionType"
        }
      },
      "todaysCollectionForConnectionType": {
        "sum": {
          "field": "todaysCollectionForConnectionType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-connectiontype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-connectiontype/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-channeltype/_stop
GET _transform/ws-transform-month-channeltype
PUT _transform/ws-transform-month-channeltype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "channelType": {
        "terms": {
          "field": "channelType.keyword"
        }
      }
    },
    "aggregations": {
      "connectionsCreatedForChannelType": {
        "sum": {
          "field": "connectionsCreatedForChannelType"
        }
      },
      "sewerageConnectionsForChannelType": {
        "sum": {
          "field": "sewerageConnectionsForChannelType"
        }
      },
      "waterConnectionsForChannelType":{
        "sum": {
          "field": "waterConnectionsForChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-channeltype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-channeltype/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-usagetype/_stop
GET _transform/ws-transform-month-usagetype
PUT _transform/ws-transform-month-usagetype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageType": {
        "terms": {
          "field": "usageType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForUsageType": {
        "sum": {
          "field": "todaysCollectionForUsageType"
        }
      },
      "sewerageConnectionsForUsageType": {
        "sum": {
          "field": "sewerageConnectionsForUsageType"
        }
      },
      "waterConnectionsForUsageType":{
        "sum": {
          "field": "waterConnectionsForUsageType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-usagetype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-usagetype/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-metertype/_stop
GET _transform/ws-transform-month-metertype
PUT _transform/ws-transform-month-metertype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "meterType": {
        "terms": {
          "field": "meterType.keyword"
        }
      }
    },
    "aggregations": {
      "waterConnectionsForMeterType": {
        "sum": {
          "field": "waterConnectionsForMeterType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-metertype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-metertype/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-duration/_stop
GET _transform/ws-transform-month-duration
PUT _transform/ws-transform-month-duration
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "duration": {
        "terms": {
          "field": "duration.keyword"
        }
      }
    },
    "aggregations": {
      "pendingConnectionsForDuration": {
        "sum": {
          "field": "pendingConnectionsForDuration"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-duration"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-duration/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-taxheads/_stop
GET _transform/ws-transform-month-taxheads
PUT _transform/ws-transform-month-taxheads
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "taxHeads": {
        "terms": {
          "field": "taxHeads.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForTaxHeads": {
        "sum": {
          "field": "todaysCollectionForTaxHeads"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-taxheads"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-taxheads/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-month-paymentchanneltype/_stop
GET _transform/ws-transform-month-paymentchanneltype
PUT _transform/ws-transform-month-paymentchanneltype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-month",
    "pipeline": "ws-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-month-paymentchanneltype/_start
GET ws-national-dashboard-month/_search
GET ws-national-dashboard-month/_count

POST _transform/ws-transform-week-common/_stop
GET _transform/ws-transform-week-common
PUT _transform/ws-transform-week-common
{
  "source": {
    "index": [
      "ws-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "transactions": {
        "sum": {
          "field": "transactions"
        }
      },
      "slaCompliance": {
        "sum": {
          "field": "slaCompliance"
        }
      },
      "todaysTotalApplications": {
        "sum": {
          "field": "todaysTotalApplications"
        }
      },
      "todaysClosedApplications": {
        "sum": {
          "field": "todaysClosedApplications"
        }
      },
      "todaysCompletedApplicationsWithinSLA": {
        "sum": {
          "field": "todaysCompletedApplicationsWithinSLA"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
 "pendingApplicationsBeyondTimeline":{
        "sum": {
          "field": "pendingApplicationsBeyondTimeline"
        }
        },
      "StipulatedDays":{
        "avg": {
          "field": "StipulatedDays"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-common/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-connectiontype/_stop
GET _transform/ws-transform-week-connectiontype
PUT _transform/ws-transform-week-connectiontype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "connectionType": {
        "terms": {
          "field": "connectionType.keyword"
        }
      }
    },
    "aggregations": {
      "connectionsCreatedForConnectionType": {
        "sum": {
          "field": "connectionsCreatedForConnectionType"
        }
      },
      "todaysCollectionForConnectionType": {
        "sum": {
          "field": "todaysCollectionForConnectionType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-connectiontype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-connectiontype/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-channeltype/_stop
GET _transform/ws-transform-week-channeltype
PUT _transform/ws-transform-week-channeltype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "channelType": {
        "terms": {
          "field": "channelType.keyword"
        }
      }
    },
    "aggregations": {
      "connectionsCreatedForChannelType": {
        "sum": {
          "field": "connectionsCreatedForChannelType"
        }
      },
      "sewerageConnectionsForChannelType": {
        "sum": {
          "field": "sewerageConnectionsForChannelType"
        }
      },
      "waterConnectionsForChannelType":{
        "sum": {
          "field": "waterConnectionsForChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-channeltype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-channeltype/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-usagetype/_stop
GET _transform/ws-transform-week-usagetype
PUT _transform/ws-transform-week-usagetype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "usageType": {
        "terms": {
          "field": "usageType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForUsageType": {
        "sum": {
          "field": "todaysCollectionForUsageType"
        }
      },
      "sewerageConnectionsForUsageType": {
        "sum": {
          "field": "sewerageConnectionsForUsageType"
        }
      },
      "waterConnectionsForUsageType":{
        "sum": {
          "field": "waterConnectionsForUsageType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-usagetype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-usagetype/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-metertype/_stop
GET _transform/ws-transform-week-metertype
PUT _transform/ws-transform-week-metertype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "meterType": {
        "terms": {
          "field": "meterType.keyword"
        }
      }
    },
    "aggregations": {
      "waterConnectionsForMeterType": {
        "sum": {
          "field": "waterConnectionsForMeterType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-metertype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-metertype/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-duration/_stop
GET _transform/ws-transform-week-duration
PUT _transform/ws-transform-week-duration
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "duration": {
        "terms": {
          "field": "duration.keyword"
        }
      }
    },
    "aggregations": {
      "pendingConnectionsForDuration": {
        "sum": {
          "field": "pendingConnectionsForDuration"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-duration"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-duration/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-taxheads/_stop
GET _transform/ws-transform-week-taxheads
PUT _transform/ws-transform-week-taxheads
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "taxHeads": {
        "terms": {
          "field": "taxHeads.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForTaxHeads": {
        "sum": {
          "field": "todaysCollectionForTaxHeads"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-taxheads"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-taxheads/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

POST _transform/ws-transform-week-paymentchanneltype/_stop
GET _transform/ws-transform-week-paymentchanneltype
PUT _transform/ws-transform-week-paymentchanneltype
{
  "source": {
    "index": [
      "ws-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "paymentChannelType": {
        "terms": {
          "field": "paymentChannelType.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForPaymentChannelType": {
        "sum": {
          "field": "todaysCollectionForPaymentChannelType"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "ws-national-dashboard-week",
    "pipeline": "ws-pipeline-dashboard-paymentchanneltype"
  },
  "frequency": "1m"
}
POST _transform/ws-transform-week-paymentchanneltype/_start
GET ws-national-dashboard-week/_search
GET ws-national-dashboard-week/_count

GET ws-national-dashboard-ward/_count
GET ws-national-dashboard-week/_count
GET ws-national-dashboard-month/_count


//death----------------------------------------------------------------
GET death-cert-national-dashboard

GET death-cert-national-dashboard/_count

PUT death-cert-national-dashboard
{
  "mappings": {
      "properties": {
        "StipulatedDays": {
          "type": "long"
        },
        "age": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ageOfGenderFemale": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ageOfGenderMale": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ageOfGenderOthers": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "avgDaysForApplicationApproval": {
          "type": "long"
        },
        "boundary": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "channel": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "createdBy": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "createdTime": {
          "type": "long"
        },
        "date": {
          "type": "date",
          "format": "dd-MM-yyyy||epoch_millis"
        },
        "financialYear": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "gender": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "lastModifiedBy": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "lastModifiedTime": {
          "type": "long"
        },
        "module": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "numberOfCertificatesDownloadedTodayByBoundary": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayByChannel": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayForBoundary": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayForChannel": {
          "type": "long"
        },
        "numberOfDeathsTodayByGender": {
          "type": "long"
        },
        "numberOfDeathsTodayForAge": {
          "type": "long"
        },
        "numberOfDeathsTodayForAgeOfGenderFemale": {
          "type": "long"
        },
        "numberOfDeathsTodayForAgeOfGenderMale": {
          "type": "long"
        },
        "numberOfDeathsTodayForAgeOfGenderOthers": {
          "type": "long"
        },
        "numberOfDeathsTodayForGender": {
          "type": "long"
        },
        "region": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "state": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "timestamp": {
          "type": "date"
        },
        "todaysApprovedApplications": {
          "type": "long"
        },
        "todaysApprovedApplicationsWithinSLA": {
          "type": "long"
        },
        "todaysCollection": {
          "type": "long"
        },
        "todaysCollectionForChannel": {
          "type": "long"
        },
        "ulb": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ward": {
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



GET death-cert-national-dashboard/_count

GET death-cert-national-dashboard-ward/_count
GET death-cert-national-dashboard-week/_count
GET death-cert-national-dashboard-month/_count

//Pipelines
PUT _ingest/pipeline/death-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfDeathsTodayForGender",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfDeathsTodayForAge",
        "value": 0
      }
    }
  ]
}

PUT _ingest/pipeline/death-pipeline-dashboard-age
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfDeathsTodayForGender",
        "value": 0
      }
    }
    
  ]
} 

PUT _ingest/pipeline/death-pipeline-dashboard-boundary
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "numberOfDeathsTodayForAge",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfDeathsTodayForGender",
        "value": 0
      }
    }
  ]
} 

PUT _ingest/pipeline/death-pipeline-dashboard-channel
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "numberOfDeathsTodayForAge",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfDeathsTodayForGender",
        "value": 0
      }
    }
  ]
} 

PUT _ingest/pipeline/death-pipeline-dashboard-gender
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "numberOfDeathsTodayForAge",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    }
  ]
} 


//TRANSFORMERS
//Transform for removing ward level duplicates
PUT _transform/death-transform-ward-common
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "avg": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/death-transform-ward-common/_start
GET death-cert-national-dashboard-ward/_search
GET death-cert-national-dashboard-ward/_count

//Transforms for monthly
//Transform 1 (common)
PUT _transform/death-transform-month-common
{
  "source": {
    "index": [
      "death-cert-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "sum": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "sum": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
	  
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-month",
    "pipeline": "death-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/death-transform-month-common/_start
GET death-cert-national-dashboard-month/_search
GET death-cert-national-dashboard-month/_count

//Transform 2 (Channel)
PUT _transform/death-transform-month-channel
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "Channel":{
        "terms": {
          "field": "Channel.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForChannel": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForChannel"
        }
      },
      "todaysCollectionForChannel": {
        "sum": {
          "field": "todaysCollectionForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-month",
    "pipeline": "death-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/death-transform-month-channel/_start
GET death-cert-national-dashboard-month/_search
GET death-cert-national-dashboard-month/_count

//Transform 3 (Boundary)
PUT _transform/death-transform-month-boundary
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "boundary":{
        "terms": {
          "field": "boundary.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForBoundary": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForBoundary"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-month",
    "pipeline": "death-pipeline-dashboard-boundary"
  },
  "frequency": "1m"
}
POST _transform/death-transform-month-boundary/_start
GET death-cert-national-dashboard-month/_search
GET death-cert-national-dashboard-month/_count

//Transform 4 (Gender)
PUT _transform/death-transform-month-gender
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "gender":{
        "terms": {
          "field": "gender.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfDeathsTodayForGender": {
        "sum": {
          "field": "numberOfDeathsTodayForGender"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-month",
    "pipeline": "death-pipeline-dashboard-gender"
  },
  "frequency": "1m"
}
POST _transform/death-transform-month-gender/_start
GET death-cert-national-dashboard-month/_search
GET death-cert-national-dashboard-month/_count

//Transform 5 (Age)
PUT _transform/death-transform-month-age
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "age":{
        "terms": {
          "field": "age.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfDeathsTodayForAge": {
        "sum": {
          "field": "numberOfDeathsTodayForAge"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-month",
    "pipeline": "death-pipeline-dashboard-age"
  },
  "frequency": "1m"
}
POST _transform/death-transform-month-age/_start
GET death-cert-national-dashboard-month/_search
GET death-cert-national-dashboard-month/_count

//Transforms for weekly
//Transform 1 (common)
PUT _transform/death-transform-week-common
{
  "source": {
    "index": [
      "death-cert-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "sum": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "sum": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-week",
    "pipeline": "death-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/death-transform-week-common/_start
GET death-cert-national-dashboard-week/_search
GET death-cert-national-dashboard-week/_count

//Transform 2 (Channel)
PUT _transform/death-transform-week-channel
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "Channel":{
        "terms": {
          "field": "Channel.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForChannel": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForChannel"
        }
      },
      "todaysCollectionForChannel": {
        "sum": {
          "field": "todaysCollectionForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-week",
    "pipeline": "death-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/death-transform-week-channel/_start
GET death-cert-national-dashboard-week/_search
GET death-cert-national-dashboard-week/_count

//Transform 3 (Boundary)
PUT _transform/death-transform-week-boundary
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "boundary":{
        "terms": {
          "field": "boundary.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForBoundary": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForBoundary"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-week",
    "pipeline": "death-pipeline-dashboard-boundary"
  },
  "frequency": "1m"
}
POST _transform/death-transform-week-boundary/_start
GET death-cert-national-dashboard-week/_search
GET death-cert-national-dashboard-week/_count

//Transform 4 (Gender)
PUT _transform/death-transform-week-gender
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "gender":{
        "terms": {
          "field": "gender.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfDeathsTodayForGender": {
        "sum": {
          "field": "numberOfDeathsTodayForGender"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-week",
    "pipeline": "death-pipeline-dashboard-gender"
  },
  "frequency": "1m"
}
POST _transform/death-transform-week-gender/_start
GET death-cert-national-dashboard-week/_search
GET death-cert-national-dashboard-week/_count

//Transform 5 (Age)
PUT _transform/death-transform-week-age
{
  "source": {
    "index": [
      "death-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "age":{
        "terms": {
          "field": "age.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfDeathsTodayForAge": {
        "sum": {
          "field": "numberOfDeathsTodayForAge"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "death-cert-national-dashboard-week",
    "pipeline": "death-pipeline-dashboard-age"
  },
  "frequency": "1m"
}
POST _transform/death-transform-week-age/_start
GET death-cert-national-dashboard-week/_search
GET death-cert-national-dashboard-week/_count



//BIRTH------------------------------------------------------------------------------------
GET birth-cert-national-dashboard

GET birth-cert-national-dashboard/_count

GET birth-cert-national-dashboard-ward/_count
GET birth-cert-national-dashboard-week/_count
GET birth-cert-national-dashboard-month/_count

GET birth-cert-national-dashboard
PUT birth-cert-national-dashboard
{
  "mappings": {
      "properties": {
        "StipulatedDays": {
          "type": "long"
        },
        "age": {
          "type": "long"
        },
        "avgDaysForApplicationApproval": {
          "type": "long"
        },
        "birthType": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "boundary": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "certificateDownloadsByBoundaryByMobileApp": {
          "type": "long"
        },
        "certificateDownloadsByBoundaryByWeb": {
          "type": "long"
        },
        "certificateDownloadsByChannelByMobileApp": {
          "type": "long"
        },
        "certificateDownloadsByChannelByWeb": {
          "type": "long"
        },
        "certificateDownloadsType": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "channel": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "createdBy": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "createdTime": {
          "type": "long"
        },
        "date": {
          "type": "date",
          "format": "dd-MM-yyyy||epoch_millis"
        },
        "delayedRegistration": {
          "type": "long"
        },
        "financialYear": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "gender": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "genderFemale": {
          "type": "long"
        },
        "genderMale": {
          "type": "long"
        },
        "genderTransgender": {
          "type": "long"
        },
        "lastModifiedBy": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "lastModifiedTime": {
          "type": "long"
        },
        "module": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "numberOfBirthsToday": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "numberOfBirthsTodayByGender": {
          "type": "long"
        },
        "numberOfBirthsTodayForGender": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedToday": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "numberOfCertificatesDownloadedTodayByBoundary": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayByChannel": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayForBoundary": {
          "type": "long"
        },
        "numberOfCertificatesDownloadedTodayForChannel": {
          "type": "long"
        },
        "region": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "state": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "timestamp": {
          "type": "date"
        },
        "todaysApprovedApplications": {
          "type": "long"
        },
        "todaysApprovedApplicationsWithinSLA": {
          "type": "long"
        },
        "todaysCollection": {
          "type": "long"
        },
        "todaysCollectionForChannel": {
          "type": "long"
        },
        "totalBirthApplication": {
          "type": "long"
        },
        "totalCertificateDownload": {
          "type": "long"
        },
        "totalCertificateDownloadsByBoundary": {
          "type": "long"
        },
        "totalCollection": {
          "type": "long"
        },
        "totalDownloads": {
          "type": "long"
        },
        "totalDownloadsByBoundary": {
          "type": "long"
        },
        "totalDownloadsByMobileApp": {
          "type": "long"
        },
        "totalDownloadsByWeb": {
          "type": "long"
        },
        "ulb": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "ward": {
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

//Pipelines
//Pipeline 1 (common)
PUT _ingest/pipeline/birth-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfBirthsTodayForGender",
        "value": 0
      }
    }
  ]
}

//Pipeline 2 (Channel)
PUT _ingest/pipeline/birth-pipeline-dashboard-channel
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfBirthsTodayForGender",
        "value": 0
      }
    }
  ]
} 

//Pipeline 3 (Boundary)
PUT _ingest/pipeline/birth-pipeline-dashboard-boundary
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfBirthsTodayForGender",
        "value": 0
      }
    }
  ]
} 

//Pipeline 4 (Gender)
PUT _ingest/pipeline/birth-pipeline-dashboard-gender
{
  "processors": [
    {
      "set": {
        "field": "StipulatedDays",
        "value": 0
      }
    },
    {
      "set": {
        "field": "avgDaysForApplicationApproval",
        "value": 0
      }
    },   
     
    {
      "set": {
        "field": "todaysApprovedApplications",
        "value": 0
      }
    },
    {
      "set": {
        "field": "todaysApprovedApplicationsWithinSLA",
        "value": 0
      }
    },
    
    {
      "set": {
        "field": "todaysCollectionForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForChannel",
        "value": 0
      }
    },
    {
      "set": {
        "field": "numberOfCertificatesDownloadedTodayForBoundary",
        "value": 0
      }
    }
  ]
}

//Transform for removing ward level duplicates
PUT _transform/birth-transform-ward-common
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1d"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "avg": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "avg": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-ward",
    "pipeline": "add_timestamp_pipeline"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-ward-common/_start
GET birth-cert-national-dashboard-ward/_search
GET birth-cert-national-dashboard-ward/_count

//Transforms for monthly
//Transform 1 (common)
PUT _transform/birth-transform-month-common
{
  "source": {
    "index": [
      "birth-cert-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-month",
    "pipeline": "birth-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-month-common/_start
GET birth-cert-national-dashboard-month/_search
GET birth-cert-national-dashboard-month/_count

//Transform 2 (Channel)
PUT _transform/birth-transform-month-channel
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "channel":{
        "terms": {
          "field": "channel.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForChannel": {
        "sum": {
          "field": "todaysCollectionForChannel"
        }
      },
      "numberOfCertificatesDownloadedTodayForChannel": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-month",
    "pipeline": "birth-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-month-channel/_start
GET birth-cert-national-dashboard-month/_search
GET birth-cert-national-dashboard-month/_count

//Transform 3 (Boundary)
PUT _transform/birth-transform-month-boundary
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "boundary":{
        "terms": {
          "field": "boundary.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForBoundary": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForBoundary"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-month",
    "pipeline": "birth-pipeline-dashboard-boundary"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-month-boundary/_start
GET birth-cert-national-dashboard-month/_search
GET birth-cert-national-dashboard-month/_count

//Transform 4 (Gender)
PUT _transform/birth-transform-month-gender
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1M"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "gender":{
        "terms": {
          "field": "gender.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfBirthsTodayForGender": {
        "sum": {
          "field": "numberOfBirthsTodayForGender"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-month",
    "pipeline": "birth-pipeline-dashboard-gender"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-month-gender/_start
GET birth-cert-national-dashboard-month/_search
GET birth-cert-national-dashboard-month/_count

//Transforms for weekly
//Transform 1 (common)
PUT _transform/birth-transform-week-common
{
  "source": {
    "index": [
      "birth-cert-national-dashboard-ward"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb"
        }
      },
      "module": {
        "terms": {
          "field": "module"
        }
      }
    },
    "aggregations": {
      "StipulatedDays": {
        "avg": {
          "field": "StipulatedDays"
        }
      },
      "avgDaysForApplicationApproval":{
        "avg": {
          "field": "avgDaysForApplicationApproval"
        }
      },
     
      "todaysApprovedApplications":{
        "sum": {
          "field": "todaysApprovedApplications"
        }
      },
      "todaysApprovedApplicationsWithinSLA":{
        "sum": {
          "field": "todaysApprovedApplicationsWithinSLA"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-week",
    "pipeline": "birth-pipeline-dashboard-common"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-week-common/_start
GET birth-cert-national-dashboard-week/_search
GET birth-cert-national-dashboard-week/_count

//Transform 2 (Channel)
PUT _transform/birth-transform-week-channel
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "Channel":{
        "terms": {
          "field": "Channel.keyword"
        }
      }
    },
    "aggregations": {
      "todaysCollectionForChannel": {
        "sum": {
          "field": "todaysCollectionForChannel"
        }
      },
      "numberOfCertificatesDownloadedTodayForChannel": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForChannel"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-week",
    "pipeline": "birth-pipeline-dashboard-channel"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-week-channel/_start
GET birth-cert-national-dashboard-week/_search
GET birth-cert-national-dashboard-week/_count

//Transform 3 (Boundary)
PUT _transform/birth-transform-week-boundary
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "boundary":{
        "terms": {
          "field": "boundary.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfCertificatesDownloadedTodayForBoundary": {
        "sum": {
          "field": "numberOfCertificatesDownloadedTodayForBoundary"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-week",
    "pipeline": "birth-pipeline-dashboard-boundary"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-week-boundary/_start
GET birth-cert-national-dashboard-week/_search
GET birth-cert-national-dashboard-week/_count

//Transform 4 (Gender)
PUT _transform/birth-transform-week-gender
{
  "source": {
    "index": [
      "birth-cert-national-dashboard"
    ]
  },
  "pivot": {
    "group_by": {
      "date": {
        "date_histogram": {
          "field": "date",
          "calendar_interval": "1w"
        }
      },
      "state": {
        "terms": {
          "field": "state.keyword"
        }
      },
      "ulb": {
        "terms": {
          "field": "ulb.keyword"
        }
      },
      "module": {
        "terms": {
          "field": "module.keyword"
        }
      },
      "gender":{
        "terms": {
          "field": "gender.keyword"
        }
      }
    },
    "aggregations": {
      "numberOfBirthsTodayForGender": {
        "sum": {
          "field": "numberOfBirthsTodayForGender"
        }
      }
    }
  },
  "sync": {
    "time": {
      "field": "timestamp",
      "delay": "60s"
    }
  },
  "dest": {
    "index": "birth-cert-national-dashboard-week",
    "pipeline": "birth-pipeline-dashboard-gender"
  },
  "frequency": "1m"
}
POST _transform/birth-transform-week-gender/_start
GET birth-cert-national-dashboard-week/_search
GET birth-cert-national-dashboard-week/_count



//common -------------------------------------------------------------

GET common-national-dashboard
GET common-national-dashboard-backup
GET common-national-dashboard-temp

GET common-national-dashboard/_count
GET common-national-dashboard-backup/_count
GET common-national-dashboard-temp/_count

POST _reindex
{
  "source": {
    "index": "common-national-dashboard"
  },
  "dest": {
    "index": "common-national-dashboard-backup"
     }
}
POST _reindex
{
  "source": {
    "index": "common-national-dashboard"
  },
  "dest": {
    "index": "common-national-dashboard-temp",
    "pipeline": "add_timestamp_pipeline"
     }
}

GET common-national-dashboard
PUT common-national-dashboard
{
  "mappings": {
    "properties": {
      "createdBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "createdTime": {
        "type": "long"
      },
      "date": {
        "type": "date",
        "format": "dd-MM-yyyy||epoch_millis"
      },
      "lastModifiedBy": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "lastModifiedTime": {
        "type": "long"
      },
      "liveUlbsCountForServiceModuleCode": {
        "type": "long"
      },
      "module": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "onboardedUlbsCount": {
        "type": "long"
      },
      "region": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "serviceModuleCode": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "slaAchievement": {
        "type": "long"
      },
      "state": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "status": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "timestamp": {
        "type": "date"
      },
      "totalCitizensCount": {
        "type": "long"
      },
      "totalLiveUlbsCount": {
        "type": "long"
      },
      "totalUlbCount": {
        "type": "long"
      },
      "ulb": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "ward": {
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

POST _reindex
{
  "source": {
    "index": "common-national-dashboard-temp"
  },
  "dest": {
    "index": "common-national-dashboard"
     }
}


GET common-national-dashboard-week/_count
GET common-national-dashboard-month/_count

//Pipeline 1
PUT _ingest/pipeline/common-pipeline-dashboard-common
{
  "processors": [
    {
      "set": {
        "field": "liveUlbsCountForServiceModuleCode",
        "value": 0
      }
    }
  ]
}

//Pipeline 2
PUT _ingest/pipeline/common-pipeline-dashboard-servicemodulecode
{
  "processors": [
    {
      "set": {
        "field": "onboardedUlbsCount",
        "value": 0
      }
    },
    {
      "set": {
        "field": "slaAchievement",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalCitizensCount",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalLiveUlbsCount",
        "value": 0
      }
    },
    {
      "set": {
        "field": "totalUlbCount",
        "value": 0
      }
    }
  ]
}

//transformers
//Transform 1
POST _transform/common-transform-month-common/_stop
GET _transform/common-transform-month-common
PUT _transform/common-transform-month-common
{
      "source": {
        "index": [
          "common-national-dashboard"
        ]
      },
      "dest": {
        "index": "common-national-dashboard-month",
        "pipeline": "common-pipeline-dashboard-common"
      },
      "frequency": "1m",
      "sync": {
        "time": {
          "field": "timestamp",
          "delay": "60s"
        }
      },
      "pivot": {
        "group_by": {
          "date": {
            "date_histogram": {
              "field": "date",
              "calendar_interval": "1M"
            }
          },
          "state": {
            "terms": {
              "field": "state.keyword"
            }
          },
          "ulb": {
            "terms": {
              "field": "ulb.keyword"
            }
          },
          "module": {
            "terms": {
              "field": "module.keyword"
            }
          }
        },
        "aggregations": {
          "onboardedUlbsCount": {
            "sum": {
              "field": "onboardedUlbsCount"
            }
          },
          "slaAchievement": {
            "sum": {
              "field": "slaAchievement"
            }
          },
          "totalCitizensCount": {
            "sum": {
              "field": "totalCitizensCount"
            }
          },
          "totalLiveUlbsCount": {
            "sum": {
              "field": "totalLiveUlbsCount"
            }
          },
          "totalUlbCount": {
            "sum": {
              "field": "totalUlbCount"
            }
          }
        }
      }
    }
POST _transform/common-transform-month-common/_start

//Transform 2
POST _transform/common-transform-month-servicemodulecode/_stop
GET _transform/common-transform-month-servicemodulecode
PUT _transform/common-transform-month-servicemodulecode
{
      
      "source": {
        "index": [
          "common-national-dashboard"
        ]
      },
      "dest": {
        "index": "common-national-dashboard-month",
        "pipeline": "common-pipeline-dashboard-servicemodulecode"
      },
      "frequency": "1m",
      "sync": {
        "time": {
          "field": "timestamp",
          "delay": "60s"
        }
      },
      "pivot": {
        "group_by": {
          "date": {
            "date_histogram": {
              "field": "date",
              "calendar_interval": "1M"
            }
          },
          "state": {
            "terms": {
              "field": "state.keyword"
            }
          },
          "ulb": {
            "terms": {
              "field": "ulb.keyword"
            }
          },
          "module": {
            "terms": {
              "field": "module.keyword"
            }
          },
          "status": {
            "terms": {
              "field": "status.keyword"
            }
          },
          "serviceModuleCode": {
            "terms": {
              "field": "serviceModuleCode.keyword"
            }
          }
        },
        "aggregations": {
          "liveUlbsCountForServiceModuleCode": {
            "sum": {
              "field": "liveUlbsCountForServiceModuleCode"
            }
          }
        }
      }
    }
POST _transform/common-transform-month-servicemodulecode/_start

//Transform 3
POST _transform/common-transform-week-common/_stop
GET _transform/common-transform-week-common
PUT _transform/common-transform-week-common
{
      "source": {
        "index": [
          "common-national-dashboard"
        ]
      },
      "dest": {
        "index": "common-national-dashboard-week",
        "pipeline": "common-pipeline-dashboard-common"
      },
      "frequency": "1m",
      "sync": {
        "time": {
          "field": "timestamp",
          "delay": "60s"
        }
      },
      "pivot": {
        "group_by": {
          "date": {
            "date_histogram": {
              "field": "date",
              "calendar_interval": "1w"
            }
          },
          "state": {
            "terms": {
              "field": "state.keyword"
            }
          },
          "ulb": {
            "terms": {
              "field": "ulb.keyword"
            }
          },
          "module": {
            "terms": {
              "field": "module.keyword"
            }
          }
        },
        "aggregations": {
          "onboardedUlbsCount": {
            "sum": {
              "field": "onboardedUlbsCount"
            }
          },
          "slaAchievement": {
            "sum": {
              "field": "slaAchievement"
            }
          },
          "totalCitizensCount": {
            "sum": {
              "field": "totalCitizensCount"
            }
          },
          "totalLiveUlbsCount": {
            "sum": {
              "field": "totalLiveUlbsCount"
            }
          },
          "totalUlbCount": {
            "sum": {
              "field": "totalUlbCount"
            }
          }
        }
      }
    }
POST _transform/common-transform-week-common/_start

//Transform 4
POST _transform/common-transform-week-servicemodulecode/_stop
GET _transform/common-transform-week-servicemodulecode
PUT _transform/common-transform-week-servicemodulecode
{
      "source": {
        "index": [
          "common-national-dashboard"
        ]
      },
      "dest": {
        "index": "common-national-dashboard-week",
        "pipeline": "common-pipeline-dashboard-servicemodulecode"
      },
      "frequency": "1m",
      "sync": {
        "time": {
          "field": "timestamp",
          "delay": "60s"
        }
      },
      "pivot": {
        "group_by": {
          "date": {
            "date_histogram": {
              "field": "date",
              "calendar_interval": "1w"
            }
          },
          "state": {
            "terms": {
              "field": "state.keyword"
            }
          },
          "ulb": {
            "terms": {
              "field": "ulb.keyword"
            }
          },
          "module": {
            "terms": {
              "field": "module.keyword"
            }
          },
          "serviceModuleCode": {
            "terms": {
              "field": "serviceModuleCode.keyword"
            }
          }
        },
        "aggregations": {
          "liveUlbsCountForServiceModuleCode": {
            "sum": {
              "field": "liveUlbsCountForServiceModuleCode"
            }
          }
        }
      }
    }
POST _transform/common-transform-week-servicemodulecode/_start

GET common-national-dashboard-week/_count
GET common-national-dashboard-month/_count



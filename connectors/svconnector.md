curl --location 'http://localhost:8083/connectors' \
--header 'Content-Type: application/json' \
--data '{
    "name": "nd-connector-street-vending",
    "config": {
        "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
        "connection.url": "https://elasticsearch-data.backbone.svc.cluster.local:9200",
        "connection.username": "elastic",
        "connection.password": "8fwbD6HbJh6HU0oddsHm8TEI",
        "topics": "sv-national-dashboard",
        "key.ignore": true,
        "schema.ignore": true,
        "value.converter.schemas.enable": false,
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "batch.size": 10,
        "max.buffered.records": 500,
        "flush.timeout.ms": 600000,
        "retry.backoff.ms": 5000,
        "read.timeout.ms": 10000,
        "linger.ms": 100,
        "max.in.flight.requests": 2,
        "errors.log.enable": true,
        "errors.deadletterqueue.topic.name": "nss-es-failed",
        "tasks.max": "1",
        "elastic.security.protocol": "SSL",
        "elastic.https.ssl.truststore.location": "/tmp/keystore/es.truststore.jks",
        "elastic.https.ssl.truststore.password": "changeit",
        "connection.ssl.strict.hostname.verification": "false",
        "elastic.https.ssl.endpoint.identification.algorithm": ""
    }
}
'
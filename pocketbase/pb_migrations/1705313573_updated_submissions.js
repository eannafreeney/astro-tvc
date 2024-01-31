/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl8pa8pb2b8byj")

  // remove
  collection.schema.removeField("yfchfhdg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ks5vnwxw",
    "name": "countries",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl8pa8pb2b8byj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfchfhdg",
    "name": "country",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("ks5vnwxw")

  return dao.saveCollection(collection)
})

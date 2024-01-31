/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl8pa8pb2b8byj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jx8hwvm",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q4hnmwof",
    "name": "printer",
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

  // remove
  collection.schema.removeField("3jx8hwvm")

  // remove
  collection.schema.removeField("q4hnmwof")

  return dao.saveCollection(collection)
})

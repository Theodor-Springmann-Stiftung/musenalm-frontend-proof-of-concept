const collection_texts = {
    "id": "rpm4dysgaxdjub0",
    "created": "2023-10-29 20:30:11.765Z",
    "updated": "2023-10-29 20:36:35.467Z",
    "name": "texts",
    "type": "base",
    "system": false,
    "schema": [
        {
            "system": false,
            "id": "c4kafldt",
            "name": "Seite",
            "type": "select",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "maxSelect": 1,
                "values": [
                    "Start",
                    "Impressum",
                    "Kontakt"
                ]
            }
        },
        {
            "system": false,
            "id": "1p6oq1nf",
            "name": "Text",
            "type": "editor",
            "required": false,
            "presentable": false,
            "unique": false,
            "options": {
                "convertUrls": false
            }
        }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.Roles~\"Manager\"",
    "updateRule": "@request.auth.Roles~\"Editor\" || @request.auth.Roles~\"Manager\"",
    "deleteRule": "@request.auth.Roles~\"Manager\"",
    "options": {}
};


export default collection_texts;
const collections_user = [
		{
			"id": "f7ks6ucxkp3k8ye",
			"created": "2023-10-31 16:27:49.269Z",
			"updated": "2023-10-31 16:27:49.269Z",
			"name": "Akteure",
			"type": "base",
			"system": true,
			"schema": [
				{
					"system": false,
					"id": "mpquums1",
					"name": "Name",
					"type": "text",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "bdzi43mj",
					"name": "Lebensdaten",
					"type": "text",
					"required": false,
					"presentable": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "epse9q7t",
					"name": "Körperschaft",
					"type": "bool",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "fzaxcs8v",
					"name": "Beruf",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "6jywzrkc",
					"name": "Nachweis",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "rbs2ktsn",
					"name": "Pseudonyme",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "jvjopd43",
					"name": "Anmerkungen",
					"type": "editor",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"convertUrls": false
					}
				},
				{
					"system": false,
					"id": "qwao4okm",
					"name": "GND",
					"type": "url",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"exceptDomains": null,
						"onlyDomains": null
					}
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": "",
			"createRule": "@request.auth.id != ''",
			"updateRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
			"options": {}
		},
		{
			"id": "8q8837x8d3f05zp",
			"created": "2023-10-31 16:27:50.131Z",
			"updated": "2023-10-31 16:27:51.261Z",
			"name": "Baende",
			"type": "base",
			"system": true,
			"schema": [
				{
					"system": false,
					"id": "g2zcbwag",
					"name": "Titelangabe",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "xphoemo9",
					"name": "Kurztitel",
					"type": "text",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "7iepkjan",
					"name": "Jahr",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": 9999,
						"max": 0,
						"noDecimal": false
					}
				},
				{
					"system": false,
					"id": "kwkwxpqy",
					"name": "Verantwortlichkeitsangabe",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "rg8qx84i",
					"name": "Ortsangabe",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "ifo4jkig",
					"name": "Nachweis",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "zxb7qxyd",
					"name": "Biblio_ID",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"noDecimal": false
					}
				},
				{
					"system": false,
					"id": "adk8kd72",
					"name": "Struktur",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "sqrvxvz5",
					"name": "Norm",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "3i33c4uv",
					"name": "Anmerkungen",
					"type": "editor",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"convertUrls": false
					}
				},
				{
					"system": false,
					"id": "hk7oierh",
					"name": "Status",
					"type": "select",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"maxSelect": 3,
						"values": [
							"Original vorhanden",
							"Reprint vorhanden",
							"Fremde Herkunft"
						]
					}
				},
				{
					"system": false,
					"id": "enlprxmi",
					"name": "Gesichtet",
					"type": "bool",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "x42mdegu",
					"name": "Erfasst",
					"type": "bool",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "ceid3hre",
					"name": "Bevorzugter_Reihentitel",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "ir3idebc",
					"name": "Alternativer_Reihentitel",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "myamv4af",
					"name": "Franzoesischer_Reihentitel",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "lwosslqi",
					"name": "Deutscher_Reihentitel",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "xdtmhxdp",
					"name": "Alternatives_Titelblatt",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "dy3scdbm",
					"name": "TA_von",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "xbb5jj3x",
					"name": "hat_TA",
					"type": "relation",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "uma4ml72duegsyq",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": "",
			"createRule": "@request.auth.id != ''",
			"updateRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
			"options": {}
		},
		{
			"id": "uma4ml72duegsyq",
			"created": "2023-10-31 16:27:49.752Z",
			"updated": "2023-10-31 16:27:49.752Z",
			"name": "Reihentitel",
			"type": "base",
			"system": true,
			"schema": [
				{
					"system": false,
					"id": "8x9feuxl",
					"name": "Name",
					"type": "text",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "tcezeu0s",
					"name": "Nachweis",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "p9vrmsu5",
					"name": "Anmerkungen",
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
			"createRule": "@request.auth.id != ''",
			"updateRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
			"options": {}
		},
	];

export default collections_user;

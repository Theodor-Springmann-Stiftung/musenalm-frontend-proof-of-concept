export default collections = [
		{
			"id": "2mz6vzntsdaxky0",
			"created": "2023-10-28 11:16:16.953Z",
			"updated": "2023-10-28 16:15:47.124Z",
			"name": "Akteure",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "bquuh2w9",
					"name": "Organisation",
					"type": "bool",
					"required": false,
					"presentable": true,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "p9hvr44a",
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
					"id": "gz9sj5gq",
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
					"id": "5yfmvw6n",
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
					"id": "8d0ptpzu",
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
					"id": "jmkgjs9c",
					"name": "Anmerkung",
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
			"createRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.id != \"\"",
			"deleteRule": "@request.auth.id != \"\"",
			"options": {}
		},
		{
			"id": "nvc13ce6yp1vsoj",
			"created": "2023-10-28 11:14:22.085Z",
			"updated": "2023-10-28 13:57:35.817Z",
			"name": "Baende",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "vsir9jgy",
					"name": "Titelangabe",
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
					"id": "xw2hvde0",
					"name": "Herausgeberangabe",
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
					"id": "ub3ebrxl",
					"name": "Angaben_zur_Erscheinungsweise",
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
					"id": "v2ujuaon",
					"name": "Ort",
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
					"id": "lmupoykm",
					"name": "Jahr",
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
					"id": "fhzpvvj9",
					"name": "Reihen",
					"type": "relation",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "ui241tdniq7b50f",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "jjrxeicl",
					"name": "Uebertragungen_von",
					"type": "relation",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "ui241tdniq7b50f",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "yfrw30g3",
					"name": "Titelauflage_von",
					"type": "relation",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "ui241tdniq7b50f",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "mmuep7hc",
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
					"id": "xc9plnh0",
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
					"id": "3n35fbm1",
					"name": "Herausgeber",
					"type": "relation",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "2mz6vzntsdaxky0",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "cru81zsp",
					"name": "Verleger_Drucker",
					"type": "relation",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"collectionId": "2mz6vzntsdaxky0",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": null,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "sfi7nmdj",
					"name": "Musenalm_Nummer",
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
					"id": "k6ufrfhq",
					"name": "BIBLIO_Nummer",
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
					"id": "qryunlal",
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
					"id": "kjnhu8dm",
					"name": "Musenalm_Nummer_alt",
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
					"id": "o1ddf2uj",
					"name": "Reihentitel_alt",
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
					"id": "afq8yh18",
					"name": "Norm_alt",
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
					"id": "zemq175n",
					"name": "Gesichtet",
					"type": "bool",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "xto3hyqx",
					"name": "Erfasst",
					"type": "bool",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "35lni73y",
					"name": "Status",
					"type": "select",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"maxSelect": 3,
						"values": [
							"Original",
							"Kopie",
							"Reprint",
							"Fremde Herkunft"
						]
					}
				}
			],
			"indexes": [],
			"listRule": "",
			"viewRule": "",
			"createRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.id != \"\"",
			"deleteRule": "@request.auth.id != \"\"",
			"options": {}
		},
		{
			"id": "kxl83xbh14a59ph",
			"created": "2023-10-28 11:32:56.420Z",
			"updated": "2023-10-29 00:24:26.834Z",
			"name": "Inhalte",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "m8svamwr",
					"name": "Band",
					"type": "relation",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"collectionId": "nvc13ce6yp1vsoj",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "dprntjxy",
					"name": "Zaehler",
					"type": "number",
					"required": true,
					"presentable": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": null,
						"noDecimal": false
					}
				},
				{
					"system": false,
					"id": "1nawr7tk",
					"name": "Seite",
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
					"id": "jin7h2yp",
					"name": "Typ",
					"type": "select",
					"required": false,
					"presentable": true,
					"unique": false,
					"options": {
						"maxSelect": 26,
						"values": [
							"Corrigenda",
							"Diagramm",
							"Gedicht\\/Lied",
							"Graphik",
							"Graphik-Verzeichnis",
							"graph. Anleitung",
							"graph. Strickanleitung",
							"graph. Tanzanleitung",
							"Inhaltsverzeichnis",
							"Kalendarium",
							"Karte",
							"Musikbeigabe",
							"Musikbeigaben-Verzeichnis",
							"Motto",
							"Prosa",
							"R\\u00e4tsel",
							"Sammlung",
							"Spiegel",
							"szen. Darstellung",
							"Tabelle",
							"Tafel",
							"Titel",
							"Text",
							"Trinkspruch",
							"Umschlag",
							"Widmung"
						]
					}
				},
				{
					"system": false,
					"id": "bzqye355",
					"name": "Paginierung",
					"type": "select",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"values": [
							"Alphabetische Zählung",
							"Arabisch",
							"Römisch",
							"Sonstige Zählung",
							"1. Arabische Zählung",
							"2. Arabische Zählung",
							"3. Arabische Zählung",
							"4. Arabische Zählung",
							"5. Arabische Zählung",
							"6. Arabische Zählung",
							"7. Arabische Zählung",
							"8. Arabische Zählung",
							"1. Römische Zählung",
							"2. Römische Zählung",
							"3. Römische Zählung",
							"4. Römische Zählung",
							"5. Römische Zählung",
							"6. Römische Zählung",
							"7. Römische Zählung",
							"8. Römische Zählung"
						]
					}
				},
				{
					"system": false,
					"id": "sfvtfdfc",
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
					"id": "gqzahfjo",
					"name": "Incipit",
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
					"id": "p0wmbc1u",
					"name": "Scans",
					"type": "file",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"maxSelect": 99,
						"maxSize": 5242880,
						"mimeTypes": [],
						"thumbs": [],
						"protected": false
					}
				},
				{
					"system": false,
					"id": "osen38bs",
					"name": "Anmerkung",
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
					"id": "xfdifn7n",
					"name": "Musenalm_Nummer",
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
					"id": "rtqeiwtr",
					"name": "Musenalm_Nummer_alt",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"noDecimal": false
					}
				}
			],
			"indexes": [
				"CREATE INDEX `idx_xIwgmE6` ON `Inhalte` (`Musenalm_Nummer`)"
			],
			"listRule": "",
			"viewRule": "",
			"createRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.id != \"\"",
			"deleteRule": "@request.auth.id != \"\"",
			"options": {}
		},
		{
			"id": "ui241tdniq7b50f",
			"created": "2023-10-28 11:04:35.007Z",
			"updated": "2023-10-28 13:58:09.803Z",
			"name": "Reihentitel",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "nkwdqkbf",
					"name": "Titel",
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
					"id": "wybsovn2",
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
					"id": "uykytelr",
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
					"id": "le0ejqal",
					"name": "Musenalm_Nummer",
					"type": "number",
					"required": false,
					"presentable": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"noDecimal": true
					}
				},
				{
					"system": false,
					"id": "6ilgozyx",
					"name": "Musenalm_NR_ALT",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"noDecimal": false
					}
				}
			],
			"indexes": [
				"CREATE UNIQUE INDEX `idx_7PQozN3` ON `Reihentitel` (`Musenalm_Nummer`)"
			],
			"listRule": "",
			"viewRule": "",
			"createRule": "@request.auth.id != \"\"",
			"updateRule": "@request.auth.id != \"\"",
			"deleteRule": "@request.auth.id != \"\"",
			"options": {}
		}
	]
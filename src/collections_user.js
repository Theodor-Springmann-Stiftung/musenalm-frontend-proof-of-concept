const collections_user = [
	{
		"id": "lqqa4uwcxafkv7n",
		"created": "2023-11-01 22:01:03.173Z",
		"updated": "2023-11-01 22:01:03.173Z",
		"name": "Akteure",
		"type": "base",
		"system": true,
		"schema": [
			{
				"system": false,
				"id": "hwafudm1",
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
				"id": "unczfi75",
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
				"id": "pbkil6mj",
				"name": "Koerperschaft",
				"type": "bool",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {}
			},
			{
				"system": false,
				"id": "hpgxktb7",
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
				"id": "mdatyse9",
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
				"id": "a729purp",
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
				"id": "0tuxtdjz",
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
				"id": "ntl1kkms",
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
		"id": "2ak4zlsybo465aj",
		"created": "2023-11-01 22:01:03.568Z",
		"updated": "2023-11-01 22:01:06.855Z",
		"name": "Baende",
		"type": "base",
		"system": true,
		"schema": [
			{
				"system": false,
				"id": "ta5lbuuu",
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
				"id": "ayupthys",
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
				"id": "n6k5ajy3",
				"name": "Jahr",
				"type": "number",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"min": 0,
					"max": 9999,
					"noDecimal": false
				}
			},
			{
				"system": false,
				"id": "lvrhiblc",
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
				"id": "ogofquqp",
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
				"id": "8sim4apr",
				"name": "Verlags_Vertriebsangabe",
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
				"id": "nxbsvmdm",
				"name": "Ausgabebezeichnung",
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
				"id": "jdwkzgqu",
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
				"id": "qed6jbq4",
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
				"id": "5cr8pzbt",
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
				"id": "oiorb3xu",
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
				"id": "okfllfjh",
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
				"id": "uomf4dmx",
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
				"id": "duyxhcy3",
				"name": "Gesichtet",
				"type": "bool",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {}
			},
			{
				"system": false,
				"id": "lwwv7sp0",
				"name": "Erfasst",
				"type": "bool",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {}
			},
			{
				"system": false,
				"id": "hvq5un6h",
				"name": "Bevorzugter_Reihentitel",
				"type": "relation",
				"required": true,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "flhkvkvo",
				"name": "Alternativer_Reihentitel",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "f3sbqvdh",
				"name": "Franzoesischer_Reihentitel",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "zijqedhh",
				"name": "Deutscher_Reihentitel",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "q6adupyw",
				"name": "Alternatives_Titelblatt",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "bbvg6qc5",
				"name": "TA_von",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "ds8h85um",
				"name": "hat_TA",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "zgfr0zoc",
				"name": "Herausgabe",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "bg1dhfpm",
				"name": "Verlag",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "5overywb",
				"name": "Druck",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "adnf0wnc",
				"name": "Vertrieb",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lz5o0y4598d6n0c",
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
		"id": "vi1fzhs31bwcifv",
		"created": "2023-11-01 22:01:10.286Z",
		"updated": "2023-11-01 22:01:23.399Z",
		"name": "Inhalte",
		"type": "base",
		"system": true,
		"schema": [
			{
				"system": false,
				"id": "2pidy44i",
				"name": "Band",
				"type": "relation",
				"required": true,
				"presentable": true,
				"unique": false,
				"options": {
					"collectionId": "2ak4zlsybo465aj",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "jfrx4z5c",
				"name": "Objektnummer",
				"type": "number",
				"required": true,
				"presentable": true,
				"unique": false,
				"options": {
					"min": null,
					"max": null,
					"noDecimal": false
				}
			},
			{
				"system": false,
				"id": "n1tw4iid",
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
				"id": "i8kgviel",
				"name": "Scans",
				"type": "file",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"maxSelect": 1000,
					"maxSize": 524288000,
					"mimeTypes": [
						"application/pdf",
						"image/png",
						"image/vnd.mozilla.apng",
						"image/jpeg",
						"image/jp2",
						"image/jpx",
						"image/jpm",
						"image/gif",
						"image/jxs",
						"image/jxl",
						"image/x-xpixmap",
						"image/vnd.adobe.photoshop",
						"image/webp",
						"image/tiff",
						"image/bmp",
						"image/x-icon",
						"image/vnd.djvu",
						"image/bpg",
						"image/vnd.dwg",
						"image/x-icns",
						"image/heic",
						"image/heic-sequence",
						"image/heif",
						"image/heif-sequence",
						"image/vnd.radiance",
						"image/x-xcf",
						"image/x-gimp-pat",
						"image/x-gimp-gbr",
						"image/avif",
						"image/jxr",
						"image/svg+xml"
					],
					"thumbs": [
						"100x0",
						"250x0",
						"500x0"
					],
					"protected": false
				}
			},
			{
				"system": false,
				"id": "uuhjq3eu",
				"name": "Urheberangabe",
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
				"id": "1i1qzomm",
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
				"id": "5cd64xss",
				"name": "Seite",
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
				"id": "xxkttuzy",
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
				"id": "mhau8ko5",
				"name": "Paginierung",
				"type": "select",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"maxSelect": 1,
					"values": [
						"Römische Seitenzählung",
						"Arabische Seitenzählung",
						"Alphabetische Seitenzählung",
						"Sonstige Seitenzählung",
						"1. Arabische Seitenzählung",
						"2. Arabische Seitenzählung",
						"3. Arabische Seitenzählung",
						"4. Arabische Seitenzählung",
						"5. Arabische Seitenzählung",
						"6. Arabische Seitenzählung",
						"7. Arabische Seitenzählung",
						"8. Arabische Seitenzählung",
						"1. Römische Seitenzählung",
						"2. Römische Seitenzählung",
						"3. Römische Seitenzählung",
						"4. Römische Seitenzählung",
						"5. Römische Seitenzählung",
						"6. Römische Seitenzählung",
						"7. Römische Seitenzählung",
						"8. Römische Seitenzählung"
					]
				}
			},
			{
				"system": false,
				"id": "1n3mingl",
				"name": "Typ",
				"type": "select",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"maxSelect": 26,
					"values": [
						"Corrigenda",
						"Diagramm",
						"Gedicht/Lied",
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
						"Rätsel",
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
				"id": "tqz5a2ih",
				"name": "Geschaffen",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lqqa4uwcxafkv7n",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "fvo1evfu",
				"name": "Geschrieben",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lqqa4uwcxafkv7n",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "zxwc8gws",
				"name": "Gezeichnet",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lqqa4uwcxafkv7n",
					"cascadeDelete": false,
					"minSelect": null,
					"maxSelect": null,
					"displayFields": null
				}
			},
			{
				"system": false,
				"id": "piejejak",
				"name": "Gestochen",
				"type": "relation",
				"required": false,
				"presentable": false,
				"unique": false,
				"options": {
					"collectionId": "lqqa4uwcxafkv7n",
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
		"id": "lz5o0y4598d6n0c",
		"created": "2023-11-01 22:01:03.383Z",
		"updated": "2023-11-01 22:01:03.383Z",
		"name": "Reihentitel",
		"type": "base",
		"system": true,
		"schema": [
			{
				"system": false,
				"id": "t3sa69h6",
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
				"id": "dgaexqxk",
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
				"id": "nnculk7a",
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
	}
];

export default collections_user;

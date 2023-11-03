const collections_viewdata = [
	{
		"name": "Akteure",
		"friendlyName": "Akteure",
		"icon": "ri-group-line",
		"defaultSort": "Name,Lebensdaten",
		"columns": [
			{
				"field": "Name",
				"badge": {
					"field": "Koerperschaft",
					"friendlyName": "Körperschaft"
				}
			},
			{
				"field": "Lebensdaten"
			},
			{
				"field": "Beruf"
			},
			{
				"field": "Nachweis"
			},
			{
				"field": "Pseudonyme"
			},
			{
				"field": "Anmerkungen"
			},
			{
				"field": "GND"
			}
		],
		"crossReferences": [
            {
                "table": "Baende",
                "fields": [ "Verlag", "Druck", "Herausgabe", "Vertrieb" ],
                "sort": "Kurztitel,Jahr",
				"icon": "ri-book-line",
				"tooltip": "Bände"
            },
            {
                "table": "Inhalte",
                "fields": [ "Geschaffen", "Geschrieben", "Gezeichnet", "Gestochen" ],
                "sort": "Band.Kurztitel,Objektnummer",
				"icon": "ri-file-text-line",
				"tooltip": "Inhalte"
            }
        ]
	},
	{
		"name": "Baende",
		"icon": "ri-book-line",
		"friendlyName": "Bände",
		"defaultSort": "Kurztitel,Jahr",
		"iconcolumns": [
			{ 
				"field": "Gesichtet",
				"icon": "ri-eye-line"
			},
			{
				"field": "Erfasst",
				"icon": "ri-checkbox-circle-line"
			}
		],
		"columns": [
			{
				"field": "Kurztitel"
			},
			{
				"friendlyName": "Reihen",
				"fields": [
					{
						"field": "Bevorzugter_Reihentitel",
						"friendlyName": "Bevorzugt"
					},
					{
						"field": "Alternativer_Reihentitel",
						"friendlyName": "Alt."
					},
					{
						"field": "Franzoesischer_Reihentitel",
						"friendlyName": "frz."
					},
					{
						"field": "Deutscher_Reihentitel",
						"friendlyName": "dt."
					},
					{
						"field": "Alternatives_Titelblatt",
						"friendlyName": "alt. Titelblatt"
					},
					{
						"field": "TA_von",
						"friendlyName": "TA von"
					},
					{
						"field": "hat_TA",
						"friendlyName": "hat TA"
					}
				]
			},
			{
				"field": "Jahr"
			},
			{
				"field": "Ausgabebezeichnung"
			},
			
			{
				"friendlyName": "Personen/Körperschaften",
				"fields": [
					{
						"field": "Herausgabe"
					},
					{
						"field": "Verlag"
					},
					{
						"field": "Druck"
					},
					{
						"field": "Vertrieb"
					}
				]
			},
			{
				"field": "Titelangabe"
			},
			{
				"field": "Verantwortlichkeitsangabe"
			},
			{
				"field": "Ortsangabe"
			},
			{
				"field": "Verlags_Vertriebsangabe",
				"friendlyName": "Verlags-/Vertriebsangabe"
			},
			{
				"field": "Nachweis"
			},
			{
				"field": "Struktur"
			},
			{
				"field": "Norm"
			},
			{
				"field": "Anmerkungen"
			},
			{
				"field": "Status"
			},
			{
				"field": "Biblio_ID",
				"friendlyName": "Biblio-Nummer"
			}
		],
		"crossReferences": [
            {
                "table": "Inhalte",
                "fields": [ "Band" ],
				"sort": "Band.Kurztitel,Objektnummer",
				"icon": "ri-file-text-line",
				"tooltip": "Inhalte"
            }
        ]
	},
	{
		"name": "Inhalte",
		"icon": "ri-file-text-line",
        "defaultSort": "Band,Objektnummer",
		"schema": [
			{
				"field": "Band"
			},
			{
				"field": "Objektnummer"
			},
			{
				"field": "Typ"
			},
			{
				"field": "Scans"
			},
			{
				"field": "Seite",
				"badge": {
					"field": "Paginierung"
				}
			},
			{
				"friendlyName": "Personen/Körperschaften",
				"fields": [
					{
						"field": "Geschaffen"
					},
					{
						"field": "Geschrieben"
					},
					{
						"field": "Gezeichnet"
					},
					{
						"field": "Gestochen"
					}
				]
			},
			{
				"field": "Titelangabe"
			},
			{
				"field": "Urheberangabe"
			},
			{
				"field": "Incipit"
			},
			{
				"field": "Anmerkungen"
			}
		]
	},
	{
		"name": "Reihentitel",
		"icon": "ri-organization-chart",
		"defaultSort": "Titel",
		"schema": [
			{
				"field": "Titel"
			},
			{
				"field": "Nachweis"
			},
			{
				"field": "Anmerkungen"
			}
		],
        "crossReferences": [
            {
                "table": "Baende",
                "fields": [ "Bevorzugter_Reihentitel", "Alternativer_Reihentitel", "Franzoesischer_Reihentitel", "Deutscher_Reihentitel", "Alternatives_Titelblatt", "TA_von", "hat_TA" ],
                "sort": "Jahr,Kurztitel",
				"icon": "ri-book-line",
				"tooltip": "Bände"
            }
        ]
	},
	{
		"name": "Texte",
		"schema": [
			{
				"field": "Titel"
			},
			{
				"field": "Stichworte"
			},
			{
				"field": "Text"
			}
		]
	},
	{
		"name": "Bilder",
		"schema": [
			{
				"field": "Titel"
			},
			{
				"field": "Bilder"
			}
		]
	},
	{
		"name": "users",
		"schema": [
			{
				"field": "name"
			},
			{
				"field": "avatar"
			}
		]
	}
]

export default collections_viewdata;
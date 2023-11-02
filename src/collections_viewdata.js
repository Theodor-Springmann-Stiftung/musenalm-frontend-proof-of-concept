const collections_viewdata = [
    {
        name: "Akteure",
        icon: "ri-group-line",
        defaultSort: "Name,Lebensdaten",
        schema: [
            {
                name: "Koerperschaft",
                help: "Wahr, wenn es sich um eine Körperschaft handelt.",
                badge: {
                    before: "Titel",
                    text: "ORG",
                    tooltip: "Körperschaft"
                }
            },
        ],
        crossReferences: [
            {
                table: "Baende",
                fields: [ "Verlag", "Druck", "Herausgabe", "Vertrieb" ],
                sort: "Kurztitel,Jahr"
            },
            {
                table: "Inhalte",
                fields: [ "Geschaffen", "Geschrieben", "Gezeichnet", "Gestochen" ],
                sort: ""
            },
        ],
    },
    {
        name: "Baende",
        icon: "ri-book-line",
        friendlyName: "Bände",
        defaultSort: "Kurztitel,Jahr",
        schema: [
            {
                name: "Titelangabe",
            },
            {
                name: "Herausgeberangabe",
            },
            {
                name: "Angaben_zur_Erscheinungsweise",
                friendlyName: "Angaben zur Erscheinungsweise"
            },
            {
                name: "Gesichtet",
                iconcolumn: {
                    tooltip: "Gesichtet",
                    icon: "ri-eye-line"
                }
            },
            {
                name: "Erfasst",
                iconcolumn: {
                    tooltip: "Erfasst",
                    icon: "ri-checkbox-circle-line",
                }
            },
            {
                name: "Status",
            },
        ],
        crossReferences: [
            {
                table: "Inhalte",
                fields: [ "Band" ]
            }
        ],
        groupFields: [
            {
                name: "Reihen",
                fields: ["Bevorzugter_Reihentitel", "Alternativer_Reihentitel", "Franzoesischer_Reihentitel", "Deutscher_Reihentitel", "Alternatives_Titelblatt", "TA_von", "hat_TA"]
            },
            {
                name: "Personen und Körperschaften",
                fields: ["Herausgabe", "Druck", "Verlag", "Vertrieb"]
            }
        ]
    },
    {
        name: "Inhalte",
        icon: "ri-file-text-line",
        defaultSort: "Band,Objektnummer",
        schema: [
            {
                name: "Band",
            },
            {
                name: "Objektnummer",
            },
            {
                name: "Seite",
            },
            {
                name: "Typ",
            },
            {
                name: "Paginierung",
                badge: {
                    after: "Seite"
                }
            },
            {
                name: "Titelangabe",
            },
            {
                name: "Incipit",
            },
            {
                name: "Scans",
            },
            {
                name: "Anmerkung",
            },
            {
                name: "Musenalm_Nummer",
            },
            {
                name: "Musenalm_Nummer_alt",
            },
        ],
        groupFields: [
            {
                name: "Akteure",
                fields: ["Geschaffen", "Geschrieben", "Gezeichnet", "Gestochen"]
            }
        ]
        
    },
    {
        name: "Reihentitel",
        icon: "ri-organization-chart",
        defaultSort: "Titel",
        schema: [
            {
                name: "Nachweis",
            },
            {
                name: "Anmerkungen",
            },
            {
                name: "Musenalm_Nummer",
            },
            {
                name: "Musenalm_NR_ALT",
            },
        ],
        crossReferences: [
            {
                table: "Baende",
                fields: [ "Bevorzugter_Reihentitel", "Alternativer_Reihentitel", "Franzoesischer_Reihentitel", "Deutscher_Reihentitel", "Alternatives_Titelblatt", "TA_von", "hat_TA" ],
                sort: "Jahr,Kurztitel"
            }
        ],
    }
];
export default collections_viewdata;

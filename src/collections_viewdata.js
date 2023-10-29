const collections_viewdata = [
    {
        name: "Akteure",
        icon: "ri-group-line",
        schema: [
            {
                name: "Organisation",
                help: "Wahr, wenn es sich um eine Körperschaft handelt."
            },
            {
                name: "Name",
            },
            {
                name: "Lebensdaten",
            },
            {
                name: "Nachweis",
            },
            {
                name: "Pseudonyme",
            },
            {
                name: "Anmerkung",
            },
        ],
        crossReferences: [
            {
                table: "Baende",
                fields: [ "Verleger_Drucker", "Herausgeber" ]
            },
            {
                table: "Inhalte",
                fields: [ "Urheber" ]
            },
        ]
    },
    {
        name: "Baende",
        icon: "ri-book-line",
        friendlyName: "Bände",
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
                name: "Ort",
            },
            {
                name: "Jahr",
            },
            {
                name: "Reihen",
            },
            {
                name: "Uebertragungen_von",
            },
            {
                name: "Titelauflage_von",
            },
            {
                name: "Nachweis",
            },
            {
                name: "Struktur",
            },
            {
                name: "Herausgeber",
            },
            {
                name: "Verleger_Drucker",
            },
            {
                name: "Musenalm_Nummer",
            },
            {
                name: "BIBLIO_Nummer",
            },
            {
                name: "Anmerkungen",
            },
            {
                name: "Musenalm_Nummer_alt",
            },
            {
                name: "Reihentitel_alt",
            },
            {
                name: "Norm_alt",
            },
            {
                name: "Gesichtet",
            },
            {
                name: "Erfasst",
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
        ]
    },
    {
        name: "Inhalte",
        icon: "ri-file-text-line",
        schema: [
            {
                name: "Band",
            },
            {
                name: "Zaehler",
            },
            {
                name: "Seite",
            },
            {
                name: "Typ",
            },
            {
                name: "Paginierung",
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
    },
    {
        name: "Reihentitel",
        icon: "ri-list-check",
        schema: [
            {
                name: "Titel",
            },
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
                fields: [ "Uebertragungen_von", "Reihen", "Titelauflage_von" ]
            }
        ]
    },
];
export default collections_viewdata;

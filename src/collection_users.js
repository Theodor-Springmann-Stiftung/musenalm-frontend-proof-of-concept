const collection_users = {
	"id": "fqi5mjbr4v7jxu6",
	"created": "2023-10-29 11:01:22.251Z",
	"updated": "2023-10-29 11:49:13.632Z",
	"name": "users",
	"type": "auth",
	"system": false,
	"schema": [
		{
			"system": false,
			"id": "ejk92x5n",
			"name": "Roles",
			"type": "select",
			"required": false,
			"presentable": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"Viewer",
					"Editor",
					"Manager"
				]
			}
		},
		{
			"system": false,
			"id": "tcsxnbjt",
			"name": "UserSettings",
			"type": "json",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {}
		}
	],
	"indexes": [],
	"listRule": "id = @request.auth.id || @request.auth.Roles = \"Manager\"",
	"viewRule": "id = @request.auth.id || @request.auth.Roles = \"Manager\"",
	"createRule": "@request.auth.Roles = \"Manager\"",
	"updateRule": "id = @request.auth.id || @request.auth.Roles = \"Manager\"",
	"deleteRule": "@request.auth.Roles = \"Manager\"",
	"options": {
		"allowEmailAuth": true,
		"allowOAuth2Auth": false,
		"allowUsernameAuth": true,
		"exceptEmailDomains": [],
		"manageRule": null,
		"minPasswordLength": 8,
		"onlyEmailDomains": [],
		"requireEmail": false
	}
}

export default collection_users;
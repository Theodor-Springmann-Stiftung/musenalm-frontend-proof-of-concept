const collection_users = 
{
	"id": "_pb_users_auth_",
	"created": "2023-11-01 22:01:03.142Z",
	"updated": "2023-11-01 22:01:03.143Z",
	"name": "users",
	"type": "auth",
	"system": false,
	"schema": [
		{
			"system": false,
			"id": "users_name",
			"name": "name",
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
			"id": "users_avatar",
			"name": "avatar",
			"type": "file",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [
					"image/jpeg",
					"image/png",
					"image/svg+xml",
					"image/gif",
					"image/webp"
				],
				"thumbs": null,
				"protected": false
			}
		}
	],
	"indexes": [],
	"listRule": "id = @request.auth.id",
	"viewRule": "id = @request.auth.id",
	"createRule": "",
	"updateRule": "id = @request.auth.id",
	"deleteRule": "id = @request.auth.id",
	"options": {
		"allowEmailAuth": true,
		"allowOAuth2Auth": true,
		"allowUsernameAuth": true,
		"exceptEmailDomains": null,
		"manageRule": null,
		"minPasswordLength": 8,
		"onlyEmailDomains": null,
		"requireEmail": false
	}
}

export default collection_users;
# API

This API documentation will help to understand the structure of this web application. It's based on a RESTful architecture using standard HTTP methods such as `GET`, `POST`, `PUT` and `DELETE`.

The API does not require an approved API key but instead will reject requests on sensitive endpoints. Detailed information on the specific endpoints is available in this documentation.

------------------------------------------------------------------------------------------

### Authorization  and Authentication

<details>
    <summary><code>GET</code> <code><b>/api/auth</b></code> <code>(get current authentication status)</code></summary>


##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"success":true,"message":"OK."}`                                  |
> | `403`         | `application/json`                | `{"success":false,"message":"Access denied: not whitelisted."}`     |
> | `403`         | `application/json`                | `{"success":false,"message":"Invalid or expired token."}`           |
> | `500`         | `application/json`                | `{"success":false,"message":"Invalid token payload."}`              |

</details>

<details>
    <summary><code>GET</code> <code><b>/api/auth/twitch</b></code> <code>(redirect to Twitch login page)</code></summary>


##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `302`         | None                              | None                                                                |

</details>

<details>
    <summary><code>GET</code> <code><b>/api/auth/twitch/callback</b></code> <code>(callback endpoint for Twitch login)</code></summary>


##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                                        |
> |---------------|-----------------------------------|---------------------------------------------------------------------------------|
> | `302`         | None                              | None                                                                            |
> | `400`         | `application/json`                | `{"success":false,"message":"Invalid session state."}`                          |
> | `400`         | `application/json`                | `{"success":false,"message":"Missing authorization code."}`                     |
> | `502`         | `application/json`                | `{"success":false,"message":"Unable to retrieve access token from Twitch."}`    |
> | `502`         | `application/json`                | `{"success":false,"message":"Unable to retrieve user data from Twitch."}`       |

</details>

<details>
    <summary><code>GET</code> <code><b>/api/auth/logout</b></code> <code>(logout user)</code></summary>


##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                                        |
> |---------------|-----------------------------------|---------------------------------------------------------------------------------|
> | `302`         | None                              | None                                                                            |

</details>

### Game List

<details>
    <summary><code>GET</code> <code><b>/api/games</b></code> <code>(get all games in the list)</code></summary>


##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                                        |
> |---------------|-----------------------------------|---------------------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"success":true,"data":[<games>]}`                                             |

##### Example Response
```json
{
  "success": true,
  "data": [
    {
      "id": 529340,
      "name": "Victoria 3",
      "steam_link": "https://store.steampowered.com/app/529340",
      "header_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/529340/header.jpg?t=1747044781"
    },
    {
      "id": 730,
      "name": "Counter-Strike 2",
      "steam_link": "https://store.steampowered.com/app/730",
      "header_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595"
    }
  ]
}
```

</details>

<details>
    <summary><code>GET</code> <code><b>/api/games/{id}</b></code> <code>(get details of a specific game)</code></summary>


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | number                  | id of the game whose details you want to get                          |

##### Responses

> | http code     | content-type                      | response                                                                                  |
> |---------------|-----------------------------------|-------------------------------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"success":true,"data":<game>}`                                                          |
> | `400`         | `application/json`                | `{"success":false,"message":"Invalid game id format. Please provide a valid game id."}`   |
> | `404`         | `application/json`                | `{"success":false,"message":"Game does not exist in database."}`                          |
> | `500`         | `application/json`                | `{"success":false,"message":"Internal Server Error: Unable to access the database."}`     |

##### Example Response

```json
{
  "success": true,
  "data": {
    "id": 730,
    "name": "Counter-Strike 2",
    "steam_link": "https://store.steampowered.com/app/730",
    "header_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595"
  }
}
```

</details>

<details>
    <summary><code>POST</code> <code><b>/api/games</b></code> <code>(add game to list)</code></summary>


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | number                  | id of the game you want to add                                        |

##### Responses

> | http code     | content-type                      | response                                                                                  |
> |---------------|-----------------------------------|-------------------------------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"success":true,"message":"Game added."}`                                                |
> | `400`         | `application/json`                | `{"success":false,"message":"Invalid game id format. Please provide a valid game id."}`   |
> | `403`         | `application/json`                | `{"success":false,"message":"Access denied: not whitelisted."}`                           |
> | `403`         | `application/json`                | `{"success":false,"message":"Invalid or expired token."}`                                 |
> | `404`         | `application/json`                | `{"success":false,"message":"Game not found. Please provide a valid game id."}`           |
> | `409`         | `application/json`                | `{"success":false,"message":"Game already exists."}`                                      |
> | `500`         | `application/json`                | `{"success":false,"message":"Internal Server Error: Unable to access the database."}`     |
> | `500`         | `application/json`                | `{"success":false,"message":"Invalid token payload."}`                                    |
> | `502`         | `application/json`                | `{"success":false,"message":"Steam not responding."}`                                     |

</details>

<details>
    <summary><code>DELETE</code> <code><b>/api/games</b></code> <code>(remove game from list)</code></summary>


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | number                  | id of the game you want to remove                                     |

##### Responses

> | http code     | content-type                      | response                                                                                  |
> |---------------|-----------------------------------|-------------------------------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"success":true,"message":"Game removed."}`                                              |
> | `400`         | `application/json`                | `{"success":false,"message":"Invalid game id format. Please provide a valid game id."}`   |
> | `403`         | `application/json`                | `{"success":false,"message":"Access denied: not whitelisted."}`                           |
> | `403`         | `application/json`                | `{"success":false,"message":"Invalid or expired token."}`                                 |
> | `404`         | `application/json`                | `{"success":false,"message":"Game does not exist in database."}`                          |
> | `500`         | `application/json`                | `{"success":false,"message":"Internal Server Error: Unable to access the database."}`     |
> | `500`         | `application/json`                | `{"success":false,"message":"Invalid token payload."}`                                    |

</details>

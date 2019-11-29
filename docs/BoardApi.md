#Board API

### — v1/boards?userId=* GET

Allows you to get all boards with dishes for specified ```userId```.

**Output format**
```
[
  {
    "id": 2,
    "name": "Board23",
    "createdAt": "2019-11-25",
    "changedAt": "2019-11-25T11:17:59.398+0000",
    "userId": 3,
    "dishes": [],
    "favourite": false
  },
  {
    "id": 3,
    "name": "Board2",
    "createdAt": "2019-11-25",
    "changedAt": "2019-11-25T11:17:59.398+0000",
    "userId": 3,
    "dishes": [
      {
        "id": 1,
        "name": "TestDish",
        "description": "test",
        "category": "SOUP",
        "mealTypeMask": "MTAwMTA=",
        "photoUrl": null
      }
    ],
    "favourite": false
  }
]
```

### — v1/boards POST

Allows you to create the new board for specified ```userId```.

**Input format**
```
{
  "name": "TestBoard",
  "userId": 3
}
```

**Output format**
```
{
  "id": 21
}
```

### — v1/boards/{boardId} DELETE

Allows you to delete the board with ```boardId```.

**Output format**
```
Response code: 200;
```

### — v1/boards/{boardId}/fav POST

Allows you to add/remove from favourites board with ```boardId```.

**Output format**
```
Response code: 200;
```
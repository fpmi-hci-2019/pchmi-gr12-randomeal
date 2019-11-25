#Board API

### — v1/users/{userId}/boards GET

Allows you to get all boards with dishes for specified ```userId```.

**Output format**
```
[
  {
    "id": 2,
    "name": "Board23",
    "createdAt": "2019-11-25",
    "dishes": []
  },
  {
    "id": 3,
    "name": "Board2",
    "createdAt": "2019-11-25",
    "dishes": [
      {
        "id": 1,
        "name": "TestDish",
        "description": "test",
        "category": "SOUP",
        "mealTypeMask": "MTAwMTA=",
        "photoUrl": null
      }
    ]
  }
]
```

### — v1/users/{userId}/boards POST

Allows you to create the new board for specified ```userId```.

**Input format**
```
{
  "name": "TestBoard"
}
```

**Output format**
```
{
  "id": 21
}
```

### — v1/users/{userId}/boards/{boardId} DELETE

Allows you to delete the board with ```boardId``` for specified ```userId```.

**Output format**
```
Response code: 200;
```

### — v1/users/{userId}/boards/{boardId}/fav POST

Allows you to add/remove from favourites board with ```boardId``` for specified ```userId```.

**Output format**
```
Response code: 200;
```
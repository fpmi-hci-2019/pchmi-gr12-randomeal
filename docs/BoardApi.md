#Board API

### - v1/users/{userId}/boards GET

Allows you to get all boards for specified ```userId```.

**Output format**
```
[
{
  "name": "TestBoard",
  "createdAt": "2019-11-22"
},
{
  "name": "TestBoard2",
  "createdAt": "2019-11-22"
}
]
```

### - v1/users/{userId}/boards POST

Allows you to create new board for specified ```userId```.

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

### - v1/users/{userId}/boards/{boardId} DELETE

Allows you to delete board with ```boardId``` for specified ```userId```.

**Output format**
```
Response code: 200;
```

### - v1/users/{userId}/boards/{boardId}/fav POST

Allows you to add/remove from favourites board with ```boardId``` for specified ```userId```.

**Output format**
```
Response code: 200;
```
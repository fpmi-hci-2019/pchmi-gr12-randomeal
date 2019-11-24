#User API

### - v1/users/ POST

Allows you to create new user with automatically generated password.

**Input format**
```
{
  "username": "testName",
  "email": "testEmail",
}
```

**Output format**
```
{
  "id": 1,
  "username": "testName",
  "email": "testEmail",
  "password": "fs9D/is1GKYzfk8fjf6qftlH/DTJkBh3fOeKdxs2Zr4=",
  "gender": null,
  "birthdate": null
}
```

**Important**: *```username``` and ```email``` can be null*

### - v1/users/login POST

Allows you to login user.

**Input format**
```
{
  "username": "testName",
  "email": "testEmail",
}
```

**Output format**
```
{
  "id": 1,
  "username": "testName",
  "email": "testEmail",
  "gender": null,
  "birthdate": null
}
```

### - v1/users/ GET

Allows you to get all users.

**Output format**
```
[
{
  "id": 1,
  "username": "testName",
  "email": "testEmail",
  "password": "fs9D/is1GKYzfk8fjf6qftlH/DTJkBh3fOeKdxs2Zr4=",
  "gender": null,
  "birthdate": null
},
{
  "id": 2,
  "username": "testName2",
  "email": "testEmail2",
  "password": "hsbX/is1GKYzfk8fjf6qftlH/DTJkBh3fOeKdxs2Zr4=",
  "gender": null,
  "birthdate": null
}
]
```

### - v1/users/{userId}/boards GET

Allows you to get all boards for specified user.

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
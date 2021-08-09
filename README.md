# Mind Web Series Rest Api

## Backend Deployed Link :

https://mind-web-series-restapi.herokuapp.com/

## Routes for User

### to register form 1 for a new user

- user/register1 : post

```
{
    firstName:
    lastName:
    userName:
}
```

### to register form 2 for a new user

- user/register1 : patch

```
{
    userId:
    email:
    password:
}
```

### to login an existing user

- user/login :post

```
{
    userName:
    password:
}
```

### to view the profile of an authenticated user

- user/profile :get (Protected route. Token required)

### to get verification code at user email

- user/send-verificatin-code :patch

```
{
    email:
}
```

### to forget user password

- user/forget-password :patch

```
{
    email:
    verificationCode:
    password:
}
```

### to update user profile

- user/update-profile :patch (Protected route. Token required)

```
{
    firstName:
    lastName:
    password:
}
```

## Routes for Journal

### to add a new journal

-journal/add :post (Protected route. Token required)

```
{
    journalTitle:
    journalDescription:
    entryDate: format ( yyyy-mm-dd )
}
```

### to get all journals for a specific user

- journal/get-all :get (Protected route. Token required)

### to get a single journal for a specific user

- journal/get-single :post (Protected route. Token required)

```
{
    journalId:
}
```

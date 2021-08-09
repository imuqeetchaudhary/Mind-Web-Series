# Mind Web Series Rest Api

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

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

- user/register1 : post

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
    email OR userName:
    password:
}
```

### to view the profile of an authenticated user

- user/profile :get (Protected route. Token required)

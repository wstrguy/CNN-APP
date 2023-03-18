#<p align="center">Credit-line News Network (CNN) API Documentation</p>

![Schema Diagram](https://res.cloudinary.com/drd06lih3/image/upload/v1679144772/Screenshot_2023-03-17_at_9.19.11_AM_rbp9cx.png)

#Introduction

Credit-line News Network (CNN) is the largest syndicate of breaking news and other news worldwide. They focus on the millennial audience. They’ve contracted the project for Grazac to rethink the news experience for their website.

The goal is to design a compelling news site for today’s generation of news consumers. CNN doesn’t want to be dogmatic about “how they’ve always done things.” They want to break new ground; they want this new site to take a few risks and they’re counting on us to bring change to the industry.

As a Chief Editor at CNN, you should be able to post new news, edit existing ones, and delete some in case of plagiarism or for political reasons. Users should also be able to read your news.

    This documentation provides guidelines on how to consume the APIs endpoint created for the CNN website.

#Authentication

The API endpoints are protected, and you will need to log in to access them as a Chief-Editor. To log in, you will need to make a POST request to the 'login' endpoint with your 'Email' and 'Password'. The response will contain an **access token** that you will use to access other endpoints.
``` javascript
POST /api/login
```
#####Request Body

Parameter    | Type          | Description
------------ | ------------- | ------------
Email        | String        | Your email address
Password     | String        | Your Password

###Response
The response body will contain the access token that you will use to access other endpoints.
``` javascript
{
    "message": "Editor logged in successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTUxZGRiNTQ0ZmYxZTczZTgwMDM0ZCIsImVtYWlsIjoib2hpbWFpOTdAZ21haWwuY29tIiwiaWF0IjoxNjc5MTA5NzM5LCJleHAiOjE2NzkxMTAzMzl9.MSAhUbgAmHKpfCnjW48mUq2LFpsOrYAophMlST2T2sc"
}
```

#Create an Account

If you do not have an account, you can create one by making a POST request to the register endpoint with your First Name, Last Name, Email, and Password.
``` javascript
POST /api/signup
```
#####Request Body
Parameter    | Type          | Description
------------ | ------------- | ------------
First_name   | String        | Your first name
Last_name    | String        | Your last name
Email        | String        | Your email address
Password     | String        | Your Password


#News
##Create News
As a Chief Editor, you can post new news by making a POST request to the news endpoint with the Title and Body of the news.
``` javascript
POST /api/news
```
#####Request Body
Parameter    | Type          | Description
------------ | ------------- | ------------
Title        | String        | title of the news
Body         | String        | body of the news

###Response
The response body will contain the details of the news that was created.


#Edit News
As a Chief Editor, you can edit existing news by making a PUT request to the edit-news/{id} endpoint with the Title and Body of the news.
``` javascript
PUT /api/edit-news/{id}
```
#####Request Parameters
Parameter    | Type          | Description
------------ | ------------- | ------------
id           | Integer       | ID of the news to edit

#####Request Body
Parameter    | Type          | Description
------------ | ------------- | ------------
Title        | String        | updated title of the news
Body         | String        | updated body of the news

###Response
The response body will contain the details of the news that was updated.
``` javascript
{
    "id": 1,
    "title": "Updated Title of the News",
    "body": "Updated Body of the news",
    "created_at": "2023-03-18T12:00:00.000000Z",
    "updated_at": "2023-03-18T13:00:00.000000Z"
}
```

#Delete News

As a Chief Editor, you can delete a news by making a DELETE request to the delete-news/{id} endpoint with the ID of the news to be deleted.
``` javascript
DELETE /api/delete-news/{id}
```
#####Request Parameters
Parameter    | Type          | Description
------------ | ------------- | ------------
id           | Integer       | ID of the news to delete

###Response
The response body will contain a success message.
``` javascript
{
    "message": "News deleted successfully",
    "news": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

#Read All News

To read all available news, you can make a GET request to the news endpoint.
``` javascript
GET /api/news
```
####Response
The response body will contain an array of all available news.
``` javascript
[
    {
        "id": 1,
        "title": "Title of the News",
        "body": "Body of the news",
        "created_at": "2023-03-18T12:00:00.000000Z",
        "updated_at": "2023-03-18T12:00:00.000000Z"
    },
    {
        "id": 2,
        "title": "Another Title of the News",
        "body": "Another Body of the news",
        "created_at": "2023-03-17T10:00:00.000000Z",
        "updated_at": "2023-03-17T10:00:00.000000Z"
    }
]
```
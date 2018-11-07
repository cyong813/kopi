# COFFEEEEEEEE

## Overview

I love going to coffee shops to study and enjoy the vibes. But there are times where I crave a specific drink, or the place I want to go to doesn't approve of laptops (totally understandable), or maybe there's no space and I'd like to try a different place.

COFFEEEEEEEE is a web app that allows users to search for varieties of local coffee shops and cafes near them. Users can register, login, and bookmark coffee shops for the sake of going another day or to remind them that's their favorite. You are able to filter by drinks, time, closest location, internet access, and so on.

In the future, I would hope to develop this into a more elaborate platform where coffee culture can be incorporated and celebrated through this app. This could include job postings for baristas/waiters/waitresses/etc, listing events happening at the coffee shops, listing coffee festivals and general events, and other features to host the coffee community.

The name COFFEEEEEEEE is inspired by a cafe and a sign I always used to pass by in high school. 

## Data Model

The application will store Users, Bookmarks, Cafes and Drinks

* users can have multiple bookmarks of cafes and drinks (via referencing)
* each cafe can have multiple drinks (by embedding) and other information about the cafe

An Example User:

```javascript
{
  username: "corninna",
  hash: // a password hash,
  bookmarks: // an array of references to Cafe and Drink documents
}
```

An Example Bookmark with Embedded Items:

```javascript
{
  user: // a reference to a User object
  cafes: [
    { name: "Cafe Madeline", cafe_id: 3},
    { name: "Roots Cafe", cafe_id: 4},
  ],
  drinks: [
    { name: "White Mocha", coffee_id: 11},
    { name: "Maple Latte", coffee_id: 12},
  ],
  createdAt: // timestamp
}
```

An Example Cafe (also ref to Yelp API):

```javascript
{
  id: 4,
  name: "Roots Cafe",
  address: "639 5th Ave, Brooklyn, NY 11215",
  phone: "347-223-4614",
  website: "http://www.rootsbrooklyn.com",
  hours: [
    {
      "open": [
        {
          "is_overnight": false,
          "end": "2200",
          "day": 0,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 1,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 2,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 3,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 4,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 5,
          "start": "1730"
        },
        {
          "is_overnight": false,
          "end": "2200",
          "day": 6,
          "start": "1730"
        }
      ],
      "is_open_now": false
    }
  ],
  categories: [
    { name: "American" }
  ],
  coordinates: {
    "latitude": 37.80587,
    "longitude": -122.42058
  },
  drinks: [
    { name: "Maple Butter Latte", coffee_id: 13},
    { name: "Maple Latte", coffee_id: 12},
  ],
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create bookmarks containing cafes and drinks
4. as a user, I can view all my bookmarks in a single list
5. as a user, I can add items to my bookmark list
6. as a user, I can view all cafes and filter accordingly

## Research Topics

* React Bootstrap
* React.js as the frontend framework
* Using Webpack 
    * Sass 
* Google Map API

10 points total out of 8 required points

## [Link to Initial Main Project File](app.js) 

[app.js](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/cyong813-final-project/src/app.js)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [React 16 - The Complete Guide (incl. React Router 4 & Redux)](https://www.udemy.com/react-the-complete-guide-incl-redux/) 
2. [MERN Stack Tutorial](https://appdividend.com/2017/06/28/mern-stack-tutorial/) 
  - [React.js Project](https://github.com/KrunalLathiya/reactfrontend)
  - [Node.js Express Project](https://github.com/KrunalLathiya/expressbackend)
  

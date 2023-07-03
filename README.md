
# Kirayo Mobile App
The project is to provide a platform for the masses to exchange their products on a rental
basis. They can rent out the less used stuff to earn some extra cash and can also rent the
things they need for temporary use to save some more money.

## Problem Statement
Many individuals own products they hardly ever use, whereas other people could
temporarily require the same things. However, there is currently no effective way for
people to find items they need for short-term use or rent out their unused items. As a
result, people frequently purchase things that they will only need temporarily, resulting
in excessive consumption and irrational costs.

Numerous environments, including homes, workplaces, and universities, have reported
this issue. On the environment and people's finances, the trend of excessive consumption
and lack of sharing has significant negative effects.

Therefore, there is an urgent need for a platform that facilitates the sharing economy and
provides a solution to the problem of wasteful consumption. Such a platform can
empower people to save money and resources by renting out their underused items and
finding temporary use for items they need.

## Objective
The purpose of our product is to deliver a dedicated platform to the masses where they
can exchange their products on a rental basis. This will bridge the existing gap in society
by using this type of renting platform.

The practice of renting things is old but is not digitized efficiently to date. Moreover,
renting became limited to a few categories like real estate and vehicles. We will tap the
more untouched categories and will break the existing stereotypes about renting. Our
product marketing will educate the people and spread the awareness which is lacking
currently in society.

The aim is not limited to just providing a listing platform where we will redirect two
persons, but we will try to automate the renting process hassle-free, trustworthy and
doable. The renting platform will satisfy users’ needs and become a reliable means for
this niche area.

All of the above will become possible with the mobile application. The same application
will tackle both sides of the idea; renting out and taking on rent. Thus, the application will have two interfaces for renting out the belongings. Both sides of the application will
run in parallel seamlessly, utilizing a better interface design.

As a result, after some time, we can see an interactive community where people will
fulfil other needs and wants by renting out their belongings for a reasonable amount.
Additionally, no one will be anxious about their monthly budget because of the
additional expense of shopping for some occasions.

In a nutshell, it is the need of the time in our society. The solution allows everyone to
save and earn money and enjoy the experiences instead of enjoying their imaginations.

## Scope
The platform will provide a marketplace for users to list and rent nontraditional and
unconventional items. Users will be able to register and log in using their email or phone
and verify their email. The platform will support searching and browsing for items, as
well as uploading and reserving items for rent. The system does not currently support
sign-in/up with other accounts, cart or wallet systems, real estate, or vehicles. It also
does not address any legal or ethical issues, which are the responsibility of the users.

## Background and Motivation

The thinking behind this idea comes from the mind of a typical middle-class man. As we
know very well Pakistanis have a relatively low purchasing power parity as inhabitants
of a third-world country. Investing money in products that are only needed temporarily
is not economically beneficial. Renting items, from bungalows to vehicles, is always a
way to avoid these types of troubles. But in this digital age, there is a lack of such
platforms which provide products from different categories for rent.

We are inspired by what Airbnb does in the residential rental space. They make the
process hassle-free with more focus on making it a wonderful experience. This
Similarly, we will provide a two-in-one value proposition i.e. rentee benefits by saving
some money and the renter by having some extra income. Interestingly, one person can
do both at the same time which will make our system unique and enable it to add more
value to terms of finance for a user.

# Technology Stack

## Frontend
The frontend of our project was built using the React Native framework, which allowed
us to quickly develop a mobile application for both iOS and Android platforms. React
Native is a popular choice for building mobile applications due to its ease of use,
cross-platform compatibility, and extensive community support.

We started by defining our user interface using React Native components, which allowed
us to create reusable and modular UI elements. We used the JSX syntax to write our
components and styled them using CSS-like stylesheets.

Next, we integrated our frontend with the backend APIs using the fetch API, which
allowed us to make HTTP requests and handle responses asynchronously. We used
JSON for data interchange between the frontend and backend.

For user authentication and authorization, we implemented a JWT-based authentication
flow on the frontend. We used the JWT (json web token) library to generate and verify
JWTs and stored the tokens in the device's local storage for persistent authentication.

To improve the user experience and performance, we also used several third-party
libraries such as react-native-elements for UI components, react-navigation for
navigation, and Axios for HTTP requests.   

## Backend

The backend of our project was built using the Spring Boot framework, which allowed
us to quickly develop a robust and scalable web application. Spring Boot is a popular
choice for building backend systems due to its ease of use, rapid development
capabilities, and extensive documentation and community support.

We started by defining our data model using JPA and Hibernate, which allowed us to
map our Java objects to the database schema. We used POSTGRESQL as our database
management system and configured the database connection in the
application.properties file.

Next, we created RESTful APIs using Spring MVC, which allowed us to expose our
data model to the frontend of the application. We implemented the CRUD (Create, Read,
Update, Delete) operations for our resources using HTTP methods (GET, POST, PUT,
DELETE) and Spring Data JPA repositories.

For user authentication and authorization, we used Spring Security, which provided a
robust and customizable framework for securing our APIs. We implemented JWT
(JSON Web Token) authentication to securely authenticate users and generate access
tokens.

## Third-party Libraries and APIs
- React Navigation
- Axios
- Context API
- React Native Elements
- Moment.js
- Google Maps API
- Stripe API
- Spring Security
- Spring Boot Starter JDBC
- Spring Boot Starter Web
- JPA/Hibernate
- Lombok Annotation


## Run Locally

### Frontend

Clone the project

```bash
  git clone https://github.com/Sumair2000/Kirayo-App
```

Go to the project directory

```bash
  cd Kirayo-App/Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Setting environmental variable

Create a file `.env` in Frontend directory and initialize all the variables


```bash
REACT_SENDGRID_API_KEY=
FROM_EMAIL=
STRIPE_PUBLISHED_KEY=
STRIPE_SECRET_KEY=
PORT=
```






## Screenshots

### Login and Registration
<p float="left">
<img src="https://github.com/Sumair2000/Kirayo-App/blob/main/Frontend/snaps/Screenshot_1683057900.png" width="250"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Sumair2000/Kirayo-App/blob/main/Frontend/snaps/Screenshot_1683057908.png" width="250"/>
</p>





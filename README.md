# MovieDL (working title)

### Project Overview
MovieDL is an e-commerce web app featuring a huge array of movies available for purchase and "download" via our custom browse and shopping cart system.  Quickly find your favorite movies, add them to your cart, and check out in quick succession, thanks to our fully responsive, appealing user interface and logical design.  Not sure what you want to watch, or need more information about a title?  Just ask our integrated chat bot assistant, powered by OpenAI!  Forgot what you bought in a previous order?  No worries, you can log in again anytime and review your purchases (and "download") from your full order history.  Worried that someone will judge you by your taste in movies?  Don't!  Your data has been secured via Spring Security and JWT and only you can access your information.  And keep an eye out for sales - the MovieDL team has been known to run sales on top releases when you least expect it!

***

### Features:
- REST API via Spring Boot & MySQL database, product data from TMDB API (The Movie Database) 
- Browse products via homepage and by random suggestions throughout site
- Product filter: text search (available on all pages), filter by 1+ movie genre selections
- Product sort by alpha, price, movie release date
- Custom shopping cart system with simultaneous client and server persistence via REST endpoints, with present-cart prioritization
- User checkout and Stripe API payment UI for credit card payments (test mode only)
- User order history tables with sort, pagination
- User registration, login and editable profile page (CRUD functionality)
- Custom logging for Spring Security filters
- Admin portal/dashboard - edit product details (CRUD functionality), view all orders
- Chat GPT API integration - AI chatbot accessible from any page, answers user movie questions
- EmailJS API integration via Contact Us page
- Fully responsive styling, custom built UI components
- Hosted via AWS: RDS, EC2, S3, Route 53 - www.moviedlproject.com

***

### Tech Stack, Front End:
- [ReactJS](https://react.dev/) - JavaScript, JSX, CSS3
- [React Router DOM](https://www.npmjs.com/package/react-router-dom)
- [Zustand](https://github.com/pmndrs/zustand) state management
- Styling/UI via [Bulma](https://bulma.io), [MUI](https://mui.com/), [FontAwesome Icons](https://fontawesome.com/icons)
  
### Tech Stack, Back End:
- [Spring Boot](https://spring.io/projects/spring-boot) - Java
- [Spring Security](https://docs.spring.io/spring-security/reference/index.html)
- [MySQL](https://www.mysql.com)
- Hibernate, JPA
- [JWT](https://jwt.io/)

### APIs, Libraries, Etc
- TMDB - The Movie Database
- Stripe (test mode only)
- JWT-Decode
- EmailJS
- Toastify
- OpenAI (GPT)
- React Select
- 
***

*Project ideated and built as a group project in [LaunchCode](https://www.launchcode.org) "LiftOff" educational program, 2023/04 - 2023/06.*

<p align="center">
<a href="https://www.launchcode.org"><img src="https://www.launchcode.org/assets/dabomb-562825789d0850a41ddd8ef7eb0d0222d9ef99cd54594ee5e820cb6070fb9477.svg" alt="LaunchCode logo" title="LaunchCodeLogo" width="200"></a></p>

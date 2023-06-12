import logoLaunchCode from "./Logo_LaunchCode.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <div>
        <nav
          className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                About MovieDL
              </a>
            </li>
          </ul>
        </nav>
        <div className="title ml-6">About MovieDL</div>
        <div className="columns is-centered mx-5">
          <div className="column is-7">
            <div
              className="box p-6"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <div className="title is-4 p-2">Project Overview</div>
              <div className="content mx-5">
                MovieDL is an e-commerce web app featuring a huge array of
                movies available for purchase and "download" via our custom
                browse and shopping cart system. Quickly find your favorite
                movies, add them to your cart, and check out in quick
                succession, thanks to our fully responsive, appealing user
                interface and logical design. Not sure what you want to watch,
                or need more information about a title? Just ask our integrated
                chat bot assistant, powered by OpenAI! Forgot what you bought in
                a previous order? No worries, you can log in again anytime and
                review your purchases (and "download") from your full order
                history. Worried that someone will judge you by your taste in
                movies? Don't! Your data has been secured via Spring Security
                and JWT and only you can access your information. And keep an
                eye out for sales - the MovieDL team has been known to run sales
                on top releases when you least expect it!
              </div>
              <div className="title is-4">Features</div>
              <div className="content">
                <ul>
                  <li>
                    REST API via Spring Boot & MySQL database, product data from
                    TMDB API (The Movie Database)
                  </li>
                  <li>
                    Browse products via homepage and by random suggestions
                    throughout site
                  </li>
                  <li>
                    Product filter: text search (available on all pages), filter
                    by 1+ movie genre selections
                  </li>
                  <li>Product sort by alpha, price, movie release date</li>
                  <li>
                    Custom shopping cart system with simultaneous client and
                    server persistence via REST endpoints, with present-cart
                    prioritization
                  </li>
                  <li>
                    User checkout and Stripe API payment UI for credit card
                    payments (test mode only)
                  </li>
                  <li>User order history tables with sort, pagination</li>
                  <li>
                    User registration, login and editable profile page (CRUD
                    functionality)
                  </li>
                  <li>Custom logging for Spring Security filters</li>
                  <li>
                    Admin portal/dashboard - edit product details (CRUD
                    functionality), view all orders
                  </li>
                  <li>
                    Chat GPT API integration - AI chatbot accessible from any
                    page, answers user movie questions
                  </li>
                  <li>EmailJS API integration via Contact Us page</li>
                  <li>Fully responsive styling, custom built UI components</li>
                  <li>
                    Hosted via AWS: RDS, EC2, S3, Route 53 -
                    <Link to="www.moviedlproject.com" target="_blank">
                      www.moviedlproject.com
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="title is-4">GitHub</div>
              <div className="content">
                <ul>
                  <li>
                    <Link to="https://github.com/Apr-23-LC-LiftOff-STL/Liftoff-Team-Tjovi/tree/main" target="_blank">
                      MovieDL GitHub Link
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="title is-4">Tech Stack, Front End</div>
              <div className="content">
                <ul>
                  <li>
                    <Link to="https://react.dev" target="_blank">
                      ReactJS
                    </Link>{" "}
                    - JavaScript, JSX, CSS3
                  </li>
                  <li>
                    <Link
                      to="https://www.npmjs.com/package/react-router-dom"
                      target="_blank"
                    >
                      React Router DOM
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://github.com/pmndrs/zustand"
                      target="_blank"
                    >
                      Zustand
                    </Link>{" "}
                    state management
                  </li>
                  <li>
                    Styling via{" "}
                    <Link to="https://bulma.io" target="_blank">
                      Bulma
                    </Link>
                    ,{" "}
                    <Link to="https://mui.com" target="_blank">
                      MUI
                    </Link>
                    ,{" "}
                    <Link to="https://fontawesome.com" target="_blank">
                      FontAwesome Icons
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="title is-4">Tech Stack, Back End</div>
              <div className="content">
                <ul>
                  <li>
                    <Link
                      to="https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html"
                      target="_blank"
                    >
                      Spring MVC, via SpringBoot
                    </Link>{" "}
                    - Java
                  </li>
                  <li>
                    <Link
                      to="https://docs.spring.io/spring-security/reference/index.html"
                      target="_blank"
                    >
                      Spring Security
                    </Link>
                  </li>
                  <li>
                    <Link to="https://jwt.io" target="_blank">
                      Auth0 JWT (JSON Web Tokens)
                    </Link>
                  </li>
                  <li>Hibernate, JPA</li>
                  <li>
                    <Link to="https://www.mysql.com" target="_blank">
                      MySQL
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="title is-4">
                APIs & Libraries not mentioned above
              </div>
              <div className="content">
                <ul>
                  <li>TMDB - The Movie Database</li>
                  <li>Stripe (test mode only)</li>
                  <li>JWT-Decode</li>
                  <li>EmailJS</li>
                  <li>Toastify</li>
                  <li>OpenAI (GPT)</li>
                  <li>React Select</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="column is-5">
            <div
              className="box p-5 has-text-centered"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <Link to="https://www.launchcode.org" target="_blank">
                {logoLaunchCode && (
                  <img src={logoLaunchCode} style={{ width: "250px" }} />
                )}
              </Link>
              <div className="content has-text-centered is-italic">
                MovieDL is a software development project ideated and built as a
                group project in{" "}
                <Link to="https://www.launchcode.org" target="_blank">
                  LaunchCode
                </Link>{" "}
                "LiftOff" educational program, 2023/04 - 2023/06.
              </div>
              <div className="has-text-centered" style={{ display: "flex" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12463.52241198916!2d-90.2595139!3d38.6516256!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4d4dfb1118d%3A0x46ba750d4f6e9fe1!2sLaunchCode!5e0!3m2!1sen!2sus!4v1682710416782!5m2!1sen!2sus"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                  height={350}
                  style={{
                    flex: "2 5 auto",
                    borderStyle: "solid",
                    borderColor: "lightgray",
                    borderWidth: "1px",
                    minWidth: "100px",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

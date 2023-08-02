# Register new user via POST request using Postman

Prior to the steps below ensure you are running the back end project and localling hosting it at port:8080, as well as, having mySQL open and a schema connected to intelliJ

1.) In Postman, open a new request tab 

2.) Set the request drop down to POST and enter the URL path: http://localhost:8080/register

3.) Under the internal address bar, click body

4.) Above the text box click raw, this will make a new dropdown appear at the end that says 'text' in blue font. Click this and set the text type to JSON

5.) In the text box enter the following text:

    {
        "email": "<email>",
        "password": "<password>",
        "role": "user",
        "firstName": "<first name>",
        "lastName": "<last name>",
        "phoneNumber": "<phone number>",
        "streetAddress": "<street address>",
        "city": "<city>",
        "state": "<state abbr>",
        "zipCode": <zip code>
}

Of course, enter your own information in the < >'s, except for role, which you can just leave as user. Ensure you have quotes as those values are strings, except for zip code which can just be entered. 

6.) Hit send

7.) At the bottom of the screen you should see a message letting you know your user has been registered. Double check your customer table in MySQL to ensure the user has been successfuly added to the database.

# Copy of commit message for the commit with the above code and structure that is allowing the above functionality

1.) Created new Config package: Config package includes:
   
   a.) ProjectSecurityConfig class and includes SecurityFilterChain method to configure which URL paths require authentication and which do not. ProjectSecurityConfig class also contains PasswordEncoder method to communicate to spring security how passwords will be stored. 

   b.) CustomerUserDetails class implementing UserDetailsService which includes Overrided loadUserByUserName method. 

2.) New CustomerController with POST handler method that allows customer registration. 

3.) New Customer model class that sets all the property fields group has determined as necessary for customer registration with getters and setters. 

4.) New CustomerRepository interface extends CrudRepository and includes findByEmail method. 

## Above structure results in:
1.) Customer table builds in mySQL

2.) able to register new Customers using POST request in Postman and prohibits duplicate registrations

3.) able to login using newly registered customer crededntials 

4.) SecurityFilterChain works to allow public access to some url paths and restricts others to only authenticated users -- simply for testing purposes I have set up the following URL paths to demonstrate this functionality:

   a.) http://localhost:8080/ is open to all, allowing access to anyone without logging in first, and you should see all the movie objects like normal.
   
   b.) http://localhost:8080/{id} is set to require authentication -- if you attempt to go to this path you should be redirected to a login page. Assuming   you have already registered a new user following the steps above, simply enter those credentials. Once you hit submit you should be redirected to the 
http://localhost:8080/{id} path you originally attempted to view

## Register a new user via Postman

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
        "city": "<City>",
        "state": "MO",
        "zipCode": 63116
}

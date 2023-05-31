package com.liftoff.ecommerce.Controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CheckoutController {


    @RequestMapping("/checkout")
    public Map<String,String> checkout() throws StripeException {
        Stripe.apiKey="sk_test_51N8n2ODvHmrdraF8ov56fzzBxwokVlEvCMG8tHuBBZZCdWZT39hK9QYonV7aHiT0UwOUgsBgWTJOe97UgHBwxEoH000oqXg4Qu";
   PaymentIntentCreateParams params= PaymentIntentCreateParams.builder().setAmount(200l).setCurrency("usd").setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()).build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        Map<String,String> map = new HashMap<>();
        map.put("client_secret",paymentIntent.getClientSecret());
        return map;
    }

}
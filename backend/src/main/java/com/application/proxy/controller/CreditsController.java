package com.application.proxy.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

@Controller
@RequestMapping("/credits")
public class CreditsController {

	@Value("${stripe.api.key}")
	private String stripeKey = "";

	@Value("${stripe.api.secretKey}")
	private String stripeSecretKey = "";
	
    @GetMapping
    public String index(ModelMap model){
    	model.put("stripeKey", stripeKey);
        return "credits";
    }

    @PostMapping("/payment")
    public ResponseEntity payment(@RequestParam("stripeToken") String stripeToken, @RequestParam("amount") Long amount, @RequestParam("desc") String desc){

    	Map<String, Object> params = new HashMap<>();
    	params.put("amount", amount);
    	params.put("currency", "usd");
    	params.put("description", desc);
    	params.put("source", stripeToken);
    	params.put("source", stripeToken);
    	
    	try {
    		Stripe.apiKey = stripeSecretKey;
    		Charge charge = Charge.create(params);
    		return ResponseEntity.ok("Transaction made successfully.");
    	}catch(StripeException se) {
    		se.printStackTrace();
    		return ResponseEntity.badRequest().body("Transaction could not be successfully made. " + se.getMessage());
    	}
    }

}

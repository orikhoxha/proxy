package com.application.proxy.controller;


import com.application.proxy.domain.User;
import com.application.proxy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {


    @Autowired
    UserService userService;

    @GetMapping("/")
    public String index(){
        return "home";
    }

    @RequestMapping("/login")
    public String login(Model model){
        User user = new User();
        model.addAttribute("user", user);
        return "login";
    }

    @RequestMapping(value ="/register", method = RequestMethod.POST)
    public String register(@ModelAttribute("user") User user, Model model){

        userService.registerUser(user);
        model.addAttribute("successful_register", true);
        return "login";
    }
}

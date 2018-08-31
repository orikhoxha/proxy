package com.application.proxy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hoursDataCenter")
public class HoursDataCenter {

    @GetMapping
    public String index(){
        return "hours-data-center";
    }
}

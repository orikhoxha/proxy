package com.application.proxy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dataUsageResidential")
public class DataUsageResidential {

    @GetMapping
    public String index(){
        return "data-usage-residential";
    }
}

package com.application.proxy.controller;

import com.application.proxy.domain.Proxies;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/twentyFourHoursResidential")
public class TwentyFourHoursResidential {

    @GetMapping
    public String index(Model model){

        Proxies proxies = new Proxies();
        model.addAttribute("proxies",proxies);
        return "twenty-four-hours-residential";
    }

    /*@PostMapping("/purchase")
    public String purchase(){

    }*/

}

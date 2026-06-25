package kr.ac.kopo.hhs.todaysdessert.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/category")
    public String category() {
        return "category";
    }

    @GetMapping("/detail")
    public String detail() {
        return "detail";
    }

    @GetMapping("/intro")
    public String intro() {
        return "intro";
    }

    @GetMapping("/filter")
    public String filter() {
        return "filter";
    }

    @GetMapping("/favorite")
    public String favorite() {
        return "favorite";
    }

    @GetMapping("/month")
    public String month() {
        return "month";
    }

    @GetMapping("/search")
    public String search() {
        return "search";
    }
}
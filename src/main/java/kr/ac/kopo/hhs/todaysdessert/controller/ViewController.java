package kr.ac.kopo.hhs.todaysdessert.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;
import kr.ac.kopo.hhs.todaysdessert.domain.Dessert;
import kr.ac.kopo.hhs.todaysdessert.repository.DessertRepository;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ViewController {

    private final DessertRepository dessertRepository;

    @Autowired
    public ViewController(DessertRepository dessertRepository) {
        this.dessertRepository = dessertRepository;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "home";
    }

    @GetMapping("/category")
    public String category(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "category";
    }

    @GetMapping("/detail")
    public String detail(@RequestParam(name = "name", required = false, defaultValue = "") String name, Model model) {
        Dessert dessert = null;
        if (!name.isEmpty()) {
            dessert = dessertRepository.findByName(name);
        }
        
        if (dessert == null) {
            String fallbackName = name.isEmpty() ? "추천 디저트" : name;

            String fallbackCategory = "베이커리"; 
            if (fallbackName.contains("에이드") || fallbackName.contains("음료") || fallbackName.contains("커피")) {
                fallbackCategory = "음료";
            } else if (fallbackName.contains("케이크") || fallbackName.contains("타르트")) {
                fallbackCategory = "케이크";
            } else if (fallbackName.contains("빙수") || fallbackName.contains("파르페")) {
                fallbackCategory = "빙수&파르페";
            } else if (fallbackName.contains("아이스크림") || fallbackName.contains("그릭모모")) {
                fallbackCategory = "아이스크림";
            } else if (fallbackName.contains("베이글") || fallbackName.contains("샌드위치")) {
                fallbackCategory = "베이글&샌드위치";
            }

            dessert = new Dessert(99L, fallbackName, "imgs/추천디저트.png", 5500, 350, "알 수 없음", fallbackCategory);
        }
        
        model.addAttribute("dessert", dessert);
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "detail";
    }

    @GetMapping("/intro")
    public String intro(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "intro";
    }

    @GetMapping("/filter")
    public String filter(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "filter";
    }

    @GetMapping("/favorite")
    public String favorite(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "favorite";
    }

    @GetMapping("/month")
    public String month(Model model) {
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        return "month";
    }

    @GetMapping("/search")
    public String search(
            @RequestParam(name = "query", required = false, defaultValue = "") String query,
            @RequestParam(name = "filters", required = false, defaultValue = "") String filters,
            @RequestParam(name = "excludes", required = false, defaultValue = "") String excludes,
            Model model) {
        
        List<Dessert> allDesserts = dessertRepository.findAll();
        List<Dessert> searchResults = new ArrayList<>();
        
        // 간단한 필터링 로직 (실제로는 DB Query로 처리됨)
        for (Dessert d : allDesserts) {
            boolean match = true;
            if (!query.isEmpty()) {
                String[] queryWords = query.split("\\s+");
                for (String word : queryWords) {
                    boolean nameMatch = d.getName() != null && d.getName().contains(word);
                    boolean categoryMatch = d.getCategory() != null && d.getCategory().contains(word);
                    
                    if (!nameMatch && !categoryMatch) {
                        match = false;
                        break;
                    }
                }
            }
            // 임시로 excludes(알레르기) 필터링만 이름/알레르기 기반으로 흉내냄
            if (!excludes.isEmpty()) {
                String[] excludeArr = excludes.split(",");
                for (String ex : excludeArr) {
                    if (d.getAllergy().contains(ex.trim())) {
                        match = false;
                        break;
                    }
                }
            }
            if (match) {
                searchResults.add(d);
            }
        }
        
        String titleStr = "전체 디저트";
        if (!query.isEmpty()) {
            titleStr = "'" + query + "' 검색 결과";
        } else if (!filters.isEmpty() || !excludes.isEmpty()) {
            if (!filters.isEmpty() && !excludes.isEmpty()) {
                titleStr = "'" + filters + "' 검색 결과 ('" + excludes + "' 제외)";
            } else if (!filters.isEmpty()) {
                titleStr = "'" + filters + "' 검색 결과";
            } else if (!excludes.isEmpty()) {
                titleStr = "'" + excludes + "' 제외 검색 결과";
            }
        }
        
        model.addAttribute("titleStr", titleStr);
        model.addAttribute("desserts", searchResults);
        model.addAttribute("topDesserts", dessertRepository.findTop5());
        
        return "search";
    }
}
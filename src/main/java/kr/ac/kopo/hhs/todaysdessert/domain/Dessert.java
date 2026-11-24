package kr.ac.kopo.hhs.todaysdessert.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "dessert")
public class Dessert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dessert_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image_url")
    private String image;

    @Column(name = "price")
    private int price;

    @Column(name = "calories")
    private int calories;

    @Column(name = "allergy")
    private String allergy;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public Dessert() {}

    public Dessert(Long id, String name, String image, int price, int calories, String allergy, String category) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.calories = calories;
        this.allergy = allergy;
        this.category = category;
        this.description = "달콤하고 부드러운 매력이 돋보이는 오늘의 추천 디저트입니다.";
    }

    public Dessert(Long id, String name, String image, int price, int calories, String allergy, String category, String description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.calories = calories;
        this.allergy = allergy;
        this.category = category;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getImageUrl() { return image; }
    public void setImageUrl(String imageUrl) { this.image = imageUrl; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }

    public String getAllergy() { return allergy; }
    public void setAllergy(String allergy) { this.allergy = allergy; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

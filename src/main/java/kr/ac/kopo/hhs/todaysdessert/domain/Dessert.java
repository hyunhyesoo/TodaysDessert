package kr.ac.kopo.hhs.todaysdessert.domain;

public class Dessert {
    private Long id;
    private String name;
    private String image;
    private int price;
    private int calories;
    private String allergy;
    private String category;

    public Dessert() {}

    public Dessert(Long id, String name, String image, int price, int calories, String allergy, String category) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.calories = calories;
        this.allergy = allergy;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }

    public String getAllergy() { return allergy; }
    public void setAllergy(String allergy) { this.allergy = allergy; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}

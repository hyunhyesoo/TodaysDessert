package kr.ac.kopo.hhs.todaysdessert.repository;

import kr.ac.kopo.hhs.todaysdessert.domain.Dessert;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DessertRepository {
    private List<Dessert> desserts = new ArrayList<>();

    public DessertRepository() {
        // 실제 사용자가 추가한 이미지와 데이터로 Init data 완전 수정 및 정규 카테고리 매핑
        desserts.add(new Dessert(1L, "복숭아 그릭모모", "imgs/복숭아그릭모모.png", 6500, 300, "우유, 복숭아", "아이스크림"));
        desserts.add(new Dessert(2L, "복숭아 에이드", "imgs/복숭아에이드.png", 5000, 150, "복숭아", "음료"));
        desserts.add(new Dessert(3L, "복숭아 케이크", "imgs/복숭아케이크.png", 7000, 450, "밀, 우유, 계란, 복숭아", "케이크"));
        desserts.add(new Dessert(4L, "시나몬 롤", "imgs/시나몬롤.png", 3500, 380, "밀, 우유, 계란", "베이커리"));
        
        desserts.add(new Dessert(5L, "글레이즈드 도넛", "imgs/글레이즈드도넛.png", 2000, 250, "밀, 계란", "베이커리"));
        desserts.add(new Dessert(6L, "딸기필링 도넛", "imgs/딸기필링도넛.png", 3200, 290, "밀, 계란, 딸기", "베이커리"));
        desserts.add(new Dessert(7L, "레몬필링 도넛", "imgs/레몬필링도넛.png", 3000, 280, "밀, 계란", "베이커리"));
        desserts.add(new Dessert(8L, "말차크림 도넛", "imgs/말차크림도넛.png", 3500, 310, "밀, 계란, 우유", "베이커리"));
        desserts.add(new Dessert(9L, "스프링클 도넛", "imgs/스프링클도넛.png", 2800, 295, "밀, 계란", "베이커리"));
        desserts.add(new Dessert(10L, "오레오크림 도넛", "imgs/오레오크림도넛.png", 3500, 330, "밀, 계란, 우유", "베이커리"));
        desserts.add(new Dessert(11L, "우유크림 도넛", "imgs/우유크림도넛.png", 3300, 310, "밀, 계란, 우유", "베이커리"));
        desserts.add(new Dessert(12L, "카스테라 도넛", "imgs/카스테라도넛.png", 2800, 320, "밀, 계란, 우유", "베이커리"));
        desserts.add(new Dessert(13L, "초코코팅 도넛", "imgs/초코도넛.png", 2500, 300, "밀, 계란, 우유", "베이커리"));
    }

    public List<Dessert> findAll() {
        return desserts;
    }

    public List<Dessert> findTop5() {
        return desserts.subList(0, Math.min(5, desserts.size()));
    }

    public Dessert findByName(String name) {
        for (Dessert d : desserts) {
            if (d.getName().equals(name)) {
                return d;
            }
        }
        return null;
    }
}

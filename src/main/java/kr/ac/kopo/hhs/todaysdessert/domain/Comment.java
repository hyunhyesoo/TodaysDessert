package kr.ac.kopo.hhs.todaysdessert.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dessert_id")
    @JsonIgnore
    private Dessert dessert;

    @Column(name = "content", nullable = false, length = 500)
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 기존 Comment API 및 프론트엔드(detail.js)와의 하위 호환성을 위한 필드
    @Column(name = "writer_name")
    private String user;

    @Column(name = "legacy_date")
    private long date;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    public Comment() {}

    public Comment(String user, String text, long date, String password) {
        this.user = user;
        this.content = text;
        this.date = date;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }

    public Comment(Member member, Dessert dessert, String content) {
        this.member = member;
        this.dessert = dessert;
        this.content = content;
        this.user = (member != null) ? member.getNickname() : "방문자";
        this.date = System.currentTimeMillis();
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Member getMember() { return member; }
    public void setMember(Member member) {
        this.member = member;
        if (member != null) {
            this.user = member.getNickname();
        }
    }

    public Dessert getDessert() { return dessert; }
    public void setDessert(Dessert dessert) { this.dessert = dessert; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getUser() {
        if (member != null && member.getNickname() != null) {
            return member.getNickname();
        }
        return user;
    }
    public void setUser(String user) { this.user = user; }

    // 기존 detail.js에서 comment.text로 접근하므로 getter/setter 유지
    public String getText() { return content; }
    public void setText(String text) { this.content = text; }

    public long getDate() {
        return date > 0 ? date : System.currentTimeMillis();
    }
    public void setDate(long date) { this.date = date; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

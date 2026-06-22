package kr.ac.kopo.hhs.todaysdessert.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
public class ViewController {

    // 💬 인메모리 댓글 저장소 (서버 메모리에 보관)
    private static final List<Comment> commentList = new CopyOnWriteArrayList<>();

    // 댓글 데이터 전송 객체 (DTO)
    public static class Comment {
        private String user;
        private String text;
        private long date;

        public Comment() {}

        public Comment(String user, String text, long date) {
            this.user = user;
            this.text = text;
            this.date = date;
        }

        public String getUser() { return user; }
        public void setUser(String user) { this.user = user; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public long getDate() { return date; }
        public void setDate(long date) { this.date = date; }
    }

    @GetMapping("/")
    public String home() {
        return "home"; // templates/home.html 연결
    }

    @GetMapping("/category")
    public String category() {
        return "category"; // templates/category.html 연결
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

    // 💬 댓글 API Endpoints
    @GetMapping("/api/comments")
    @ResponseBody
    public List<Comment> getComments() {
        return commentList;
    }

    @PostMapping("/api/comments")
    @ResponseBody
    public List<Comment> addComment(@org.springframework.web.bind.annotation.RequestParam("text") String text) {
        Comment comment = new Comment();
        comment.setUser("방문자");
        comment.setText(text);
        comment.setDate(System.currentTimeMillis());
        commentList.add(comment);
        return commentList;
    }

    @DeleteMapping("/api/comments/{index}")
    @ResponseBody
    public List<Comment> deleteComment(@PathVariable("index") int index) {
        if (index >= 0 && index < commentList.size()) {
            commentList.remove(index);
        }
        return commentList;
    }
}
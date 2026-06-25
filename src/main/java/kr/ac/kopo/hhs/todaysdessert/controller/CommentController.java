package kr.ac.kopo.hhs.todaysdessert.controller;

import kr.ac.kopo.hhs.todaysdessert.domain.Comment;
import kr.ac.kopo.hhs.todaysdessert.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getComments() {
        return commentService.getAllComments();
    }

    @PostMapping
    public List<Comment> addComment(
            @RequestParam("text") String text,
            @RequestParam("user") String user,
            @RequestParam("password") String password) {
        return commentService.addComment(user, text, password);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<?> deleteComment(
            @PathVariable("index") int index,
            @RequestParam("password") String password) {
        try {
            List<Comment> updatedComments = commentService.deleteComment(index, password);
            return ResponseEntity.ok(updatedComments);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("비밀번호")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

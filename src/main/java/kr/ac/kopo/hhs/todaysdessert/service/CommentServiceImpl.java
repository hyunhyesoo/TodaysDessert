package kr.ac.kopo.hhs.todaysdessert.service;

import kr.ac.kopo.hhs.todaysdessert.domain.Comment;
import kr.ac.kopo.hhs.todaysdessert.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.getAllComments();
    }

    @Override
    public List<Comment> addComment(String user, String text, String password) {
        Comment comment = new Comment();
        comment.setUser(user != null && !user.trim().isEmpty() ? user : "방문자");
        comment.setText(text);
        comment.setPassword(password);
        comment.setDate(System.currentTimeMillis());
        commentRepository.addComment(comment);
        return commentRepository.getAllComments();
    }

    @Override
    public List<Comment> deleteComment(int index, String password) throws IllegalArgumentException {
        List<Comment> currentComments = commentRepository.getAllComments();
        if (index < 0 || index >= currentComments.size()) {
            throw new IllegalArgumentException("댓글이 존재하지 않습니다.");
        }
        
        boolean success = commentRepository.deleteComment(index, password);
        if (!success) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        
        return commentRepository.getAllComments();
    }
}

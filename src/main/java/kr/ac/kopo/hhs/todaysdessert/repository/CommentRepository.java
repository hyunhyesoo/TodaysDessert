package kr.ac.kopo.hhs.todaysdessert.repository;

import kr.ac.kopo.hhs.todaysdessert.domain.Comment;
import java.util.List;

public interface CommentRepository {
    List<Comment> getAllComments();
    void addComment(Comment comment);
    boolean deleteComment(int index, String password);
}

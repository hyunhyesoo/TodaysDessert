package kr.ac.kopo.hhs.todaysdessert.service;

import kr.ac.kopo.hhs.todaysdessert.domain.Comment;
import java.util.List;

public interface CommentService {
    List<Comment> getAllComments();
    List<Comment> addComment(String user, String text, String password);
    List<Comment> deleteComment(int index, String password) throws IllegalArgumentException;
}

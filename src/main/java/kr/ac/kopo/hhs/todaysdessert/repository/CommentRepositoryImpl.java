package kr.ac.kopo.hhs.todaysdessert.repository;

import kr.ac.kopo.hhs.todaysdessert.domain.Comment;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Repository
public class CommentRepositoryImpl implements CommentRepository {
    private final List<Comment> commentList = new CopyOnWriteArrayList<>();

    @Override
    public List<Comment> getAllComments() {
        return commentList;
    }

    @Override
    public void addComment(Comment comment) {
        commentList.add(comment);
    }

    @Override
    public boolean deleteComment(int index, String password) {
        if (index >= 0 && index < commentList.size()) {
            Comment comment = commentList.get(index);
            if (comment.getPassword() != null && comment.getPassword().equals(password)) {
                commentList.remove(index);
                return true;
            }
        }
        return false;
    }
}

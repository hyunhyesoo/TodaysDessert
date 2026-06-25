package kr.ac.kopo.hhs.todaysdessert.domain;

public class Comment {
    private String user;
    private String text;
    private long date;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private String password;

    public Comment() {}

    public Comment(String user, String text, long date, String password) {
        this.user = user;
        this.text = text;
        this.date = date;
        this.password = password;
    }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public long getDate() { return date; }
    public void setDate(long date) { this.date = date; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

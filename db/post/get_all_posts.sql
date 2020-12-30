SELECT p.content, u.username, p.post_id, u.user_id
FROM posts p 
JOIN users u ON p.user_id = u.user_id;
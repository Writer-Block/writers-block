-- CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR(200) NOT NULL, email VARCHAR(50) NOT NULL, profile_pic VARCHAR(3000) NOT NULL);

-- CREATE TABLE posts(post_id SERIAL PRIMARY KEY, user_id INT REFERENCES user(user_id), content VARCHAR(5000) NOT NULL);

-- CREATE TABLE comments(comment_id SERIAL PRIMARY KEY, post_id INT REFERENCES posts(post_id), comment VARCHAR(1000) NOT NULL);
INSERT INTO users (username, password, email, profile_pic)
VALUES ($1, $2, $3, $4)
RETURNING *;
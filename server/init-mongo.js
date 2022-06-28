db.createUser(
    {
        user: "rollwithfriends",
        pwd: "rollwithfriends",
        roles: [
            {
                role: "readWrite",
                db: "rollwithfriends"
            }
        ]
    }
);
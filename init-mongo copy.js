db.createUser (
    {
        user : "cboulet",
        pwd : "motdepasse1",
        roles : [
            {
                role : "readWrite",
                db : "firstmongodb"
            }
        ]
    }
)

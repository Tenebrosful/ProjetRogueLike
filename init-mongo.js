/* eslint-disable no-undef */
db.createUser (
    {
        pwd : "motdepasse1",
        roles : [
            {
                db : "firstmongodb",
                role : "readWrite"
            }
        ],
        user : "cboulet"
    }
);
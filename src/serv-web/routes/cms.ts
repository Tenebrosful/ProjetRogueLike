import * as express from "express";
const cmspages = express.Router();

cmspages.get("/ressources/documents", (req, res) => {
    res.render("cms/documents");
});

cmspages.get("/ressources/diagrammes", (req, res) => {
    res.render("cms/diagrammes");
});
export default cmspages;
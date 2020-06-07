const Exhibit = require("../models/exhibit-model");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const {
        properties: {
      
            categorie,
            name,
            short_description,
            description,
            date_of_detection,
        },
        url,
        geometry: { coordinates },
    } = req.body;

    const newExhibit = new Exhibit({
        properties: {
            categorie,
            name,
            short_description,
            description,
            date_of_detection,
        },
        url,
        geometry: { coordinates },
    });

    await newExhibit.save();

    res.status(200).json({ record: newExhibit, msg: "Record saved" });
});
router.get("/", async (req, res) => {
    const exhibits = await Exhibit.find().select("-__v");
    res.send(exhibits);
});

module.exports = router;

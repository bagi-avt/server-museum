const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exhibitSchema = new Schema({
    properties: {
        categorie: String,
        name: String,
        short_description: String,
        description: String,
        date_of_detection: String,
    },
    url: String,
    geometry: { coordinates: [String] },
});

const Exhibit = mongoose.model("exhibits", exhibitSchema);

module.exports = Exhibit;

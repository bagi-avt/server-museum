const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exhibitSchema = new Schema({
    type: String,
    properties: {
        exhibit_id: String,
        categorie: String,
        name: String,
        short_description: String,
        description: String,
        date_of_detection: String,
    },
    geometry: { coordinates: [String] },
});

const Exhibit = mongoose.model("user", exhibitSchema);

module.exports = Exhibit;

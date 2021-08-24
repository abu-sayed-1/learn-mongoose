const mongoose = require("mongoose");

// connect to the mongodb database
mongoose.connect("mongodb+srv://testmongoose:rakib1@cluster0.uj2jz.mongodb.net/testingmongoose?retryWrites=true&w=majority")
    .then(() => console.log("connection successful.."))
    .catch((err) => console.log(err))


// create a playlist data schema    
// A Mongoose schema defines the structure of the document,
// default values, validators, etc.,
// whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})


// collection creation below
const Playlist = new mongoose.model("Playlist", playlistSchema);

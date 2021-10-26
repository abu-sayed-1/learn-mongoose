const mongoose = require("mongoose");
const validator = require("validator");
mongoose
  .connect(
    "MongoDB connect URL here",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then((res) => console.log("connection successful"))
  .catch((err) => console.log(err));

const playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // uppercase: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
    //trim: true => means (  javascript js ) name er pasher white space remove kore dive.
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"],
    // enum => means your ctype must be enum any value same to same
  },
  video: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("videos count should not be negative");
      }
    },
    // validate: {
    //     validator: function (value) {
    //         console.log(value,"this is value")
    //         return value.length < 0
    //     },
    //     message: "videos count should not be negative"
    // }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid!");
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = new mongoose.model("Playlist", playlist);

// insert one document
const createDocument = async () => {
  try {
    firstPlaylist = new Playlist({
      name: "javascript js",
      video: 6,
      email: "rakib@gmail.com",
      active: false,
      ctype: "frontend",
    });
    const result = await firstPlaylist.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

// insert multiple documents
const multipleDocument = async () => {
  try {
    firstPlaylist = new Playlist({
      name: "Raju khan",
      video: 5,
      active: false,
    });
    secondPlaylist = new Playlist({
      name: "dav-Polash",
      video: 5,
      active: false,
    });
    thirdPlaylist = new Playlist({
      name: "as-Rakib khan",
      video: 5,
      active: true,
    });
    const result = await Playlist.insertMany([
      firstPlaylist,
      secondPlaylist,
      thirdPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// multipleDocument();

// get all Documents
const getAllDocuments = async () => {
  let getDocument = await Playlist.find();
  console.log(getDocument);
};
//  getAllDocuments();

// you can get only names
const getSpicDocuments = async () => {
  let getDocument = await Playlist.find({
    name: "dav-Rakib",
  }).select({ name: 1 });
  console.log(getDocument);
};
// getSpicDocuments();

const getMultipleDocuments = async () => {
  let getDocument = await Playlist.find({
    name: { $in: ["dav-Rakib", "Raju khan"] },
  });
  console.log(getDocument);
};
// getMultipleDocuments();

const getNoneDefineDocuments = async () => {
  let getDocument = await Playlist.find({
    name: { $nin: ["dav-Rakib", "Raju khan"] },
    // ei object golo chada baki ^^ all objects get korte parve.
  });
  console.log(getDocument);
};
// getNoneDefineDocuments();

const getDocumentsUsingLogic = async () => {
  let getDocument = await Playlist.find({
    $or: [{ name: "dav-Rakib" }, { video: 5 }],
    // use or || sign and Get Data
  });
  console.log(getDocument);
};
// getDocumentsUsingLogic();

const countDocument = async () => {
  let getDocument = await Playlist.find({
    name: "dav-Rakib",
  }).countDocuments();
  // count ^ Documents length
  console.log(getDocument);
};
// countDocument();

const getSortDocuments = async () => {
  let getDocument = await Playlist.find({
    active: true,
  })
    .select({ name: 1 })
    .sort({ name: -1 });
  //get ^ sort documents -1 means all last documents show first and 1 means show documents first.
  console.log(getDocument);
};
// getSortDocuments();

// update one Document
const updateOneDocuments = async (_id) => {
  try {
    let result = await Playlist.updateOne(
      { _id },
      {
        $set: { name: "dav-Sheikh-Rakib", video: 19 },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// updateOneDocuments("615c506cc393829c15308b8e");

// find by id and Update
const findByIdAndUpdateDocument = async (_id) => {
  try {
    let result = await Playlist.findByIdAndUpdate(
      { _id },
      {
        $set: { name: "oli-Ahmed", video: 30 },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// findByIdAndUpdateDocument("615c506cc393829c15308b8e");

// delete Document one
const deleteDocumentOne = async (_id) => {
  try {
    let result = await Playlist.deleteOne({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// deleteDocumentOne("615c506cc393829c15308b8e");

// find by id and delete document
const findByIdAndDeleteDocument = async (_id) => {
  try {
    let result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// findByIdAndDeleteDocument("615c545e75bc102fedef8f97");

const deleteManyDocuments = async () => {
  try {
    let result = await Playlist.deleteMany({ name: "dav-Polash" });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// deleteManyDocuments();

const getDoc = async () => {
  let getDocument = await Playlist.find({
    active: false,
  });
  console.log(getDocument, "response");
};
// getDoc();

const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/login");

//Add Note: Login required

router.post("/addnote", [body("title", "Enter a minimum 3 character title").isLength({ min: 3 }), body("description", "Enter a minimum 3 character password").isLength({ min: 3 })], fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // const notes = new Note();
    const { title, description, tag } = req.body;
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    note.save();

    res.send(note);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Get Notes: Login required

router.get("/getallnotes", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // console.log(req.user);
    // const notes = new Note();
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Update Notes: Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const postId = req.params.id;
    let requestedpPost = await Note.findById(postId);
    if (!requestedpPost) {
      return res.status(400).send("Post doesn't exists");
    }
    const { title, description, tag } = req.body;
    const upDate = {};
    if (title) {
      upDate.title = title;
    }
    if (description) {
      upDate.description = description;
    }
    if (tag) {
      upDate.tag = title;
    }
    if (req.user.toString() == !requestedpPost.id) {
      return res.send("BAD REQUEST");
    }

    const updatedNote = await Note.findByIdAndUpdate(postId, { $set: upDate }, { new: true });
    res.json({ updatedNote });

    // res.send({ Done: "done" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Delete Notes: Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const postId = req.params.id;
    let requestedpPost = await Note.findById(postId);
    if (!requestedpPost) {
      return res.status(400).send("Post doesn't exists");
    }

    if (req.user.toString() == !requestedpPost.id) {
      return res.send("BAD REQUEST");
    }

    const deletedNote = await Note.findByIdAndDelete(postId);
    res.json({ deletedNote });

    // res.send({ Done: "done" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
//

const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router
  .route("/api/notes")
  .get(controllers.getNotes)
  .post(controllers.createNote);
router
  .route("/api/notes/:id")
  .get(controllers.getNote)
  .delete(controllers.deleteNote);
router
  .route("/api/notes/:id/toggle_archived")
  .put(controllers.toggleNoteArchived);

module.exports = router;

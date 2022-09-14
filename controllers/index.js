const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getNotes = (req, res, next) => {
  let query = "SELECT * FROM notes";
  if (req.query.keyword) {
    const keyword = req.query.keyword;
    query += " WHERE title LIKE '%" + keyword + "%'";
  }
  conn.query(query, (err, data, fields) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.getNote = (req, res, next) => {
  if (!req.params.id) return next(new AppError("Note id not found", 404));
  conn.query(
    "SELECT * FROM notes WHERE id = ?",
    [req.params.id],
    (err, data, fields) => {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        data,
      });
    }
  );
};

exports.createNote = (req, res, next) => {
  console.log(req.body);
  const values = [req.body.title, req.body.body, false];
  conn.query(
    "INSERT INTO notes (title, body, archived) VALUES (?)",
    [values],
    (err, data, fields) => {
      if (err) return next(new AppError(err));
      console.log(data.insertId);
      res.status(201).json({
        status: "success",
        message: "Note created",
        data,
      });
    }
  );
};

exports.deleteNote = (req, res, next) => {
  if (!req.params.id) return next(new AppError("Note id not found", 404));
  conn.query(
    "DELETE FROM notes WHERE id = ? ",
    [req.params.id],
    (err, data, fields) => {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        message: "Note has been deleted",
        data: {
          deletedId: req.params.id,
        },
      });
    }
  );
};

exports.toggleNoteArchived = (req, res, next) => {
  if (!req.params.id) return next(new AppError("Note id not found", 404));
  conn.query(
    "UPDATE notes SET archived = !archived WHERE id = ?",
    [req.params.id],
    (err, data, fields) => {
      if (err) return next(new AppError(err));
      res.status(201).json({
        status: "success",
        message: "Note has been updated",
      });
    }
  );
};

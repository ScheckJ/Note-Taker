const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Helper function to read data from the JSON file
const readNotesFromFile = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
};

// Helper function to write data to the JSON file
const writeNotesToFile = (notes) => {
  try {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
  } catch (error) {
    console.error('Error writing notes:', error);
  }
};

// GET route for retrieving all notes
router.get('/api/notes', (req, res) => {
  const notes = readNotesFromFile();
  res.json(notes);
});

// POST route for adding a new note
router.post('/api/notes', (req, res) => {
  const notes = readNotesFromFile();
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  notes.push(newNote);
  writeNotesToFile(notes);
  res.json(newNote);
});

// DELETE route for deleting a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const notes = readNotesFromFile();
  const filteredNotes = notes.filter((note) => note.id !== req.params.id);

  if (notes.length === filteredNotes.length) {
    return res.status(404).json({ error: 'Note not found' });
  }

  writeNotesToFile(filteredNotes);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;

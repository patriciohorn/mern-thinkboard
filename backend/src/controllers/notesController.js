export function getAllNotes(req, res) {
  res.status(200).send('You just fetched the notes');
}

export function createNote(req, res) {
  res.status(201).json({ message: 'note created successfully!' });
}

export function updateNote(req, res) {
  res.status(200).json({ message: 'note updated sucessfully!' });
}

export function deleteNote(req, res) {
  res.status(200).json({ message: 'note deleted sucessfully!' });
}

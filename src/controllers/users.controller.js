// Estado en memoria (simulación)
let users = [
  {
    id: "1",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00Z"
  },
  {
  id: "2",
  name: "Mariana Gómez",
  email: "mariana@example.com",
  role: "admin",
  createdAt: "2025-10-01T08:30:00Z"
},
{
  id: "3",
  name: "Santiago Restrepo",
  email: "santiago@example.com",
  role: "user",
  createdAt: "2025-11-15T14:20:00Z"
}
];             

// GET /api/v1/users
const getUsers = ((req, res) => { 
  res.status(200).json(users);
 })

 // GET /users/:id
const getUsersId = ((req, res) => {
  const { id } = req.params;   // 1
  const user = users.find(u => u.id === id);   // 2

  if (!user) {   // 3
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);   // 4
});

// POST /users
const postUsers = ((req, res) => {
  const { name, email, role } = req.body;   // 1

  if (!name || !email) {   // 2
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  const newUser = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    email,
    role: role || 'user',  // valor por defecto si no envían rol
    createdAt: new Date().toISOString()
  };

  users.push(newUser);   // 4

  res.status(201).json(newUser);   // 5
});

// PUT /users/:id
const putUsers = ((req, res) => {
  const { id } = req.params;              // 1
  const { name, email, role } = req.body; // 2

  const index = users.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (!name || !email) {                  // 5
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  users[index] = {                        // 6
    ...users[index], // conserva los datos previos
    name,
    email,
    role
  };

  res.status(200).json(users[index]);     // 7
});

// PATCH /users/:id
const patchUsers = ((req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
  }

  users[index] = {
    ...users[index],
    ...updates
  };

  res.status(200).json(users[index]);
});

// DELETE /users/:id
const deleteUsers = ((req, res) => {
  const { id } = req.params;                            // 1
  const index = users.findIndex(u => u.id === id);      // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const deletedUser = users.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedUser[0].id }); // 5
});

 module.exports = {
  getUsers,
  getUsersId,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
 }
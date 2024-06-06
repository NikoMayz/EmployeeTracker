const router = require('express').Router();
const {Role, Employee} = require('../../models');

// Get all roles
router.get('/', async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
});

// Add a new role
router.post('/', async (req, res) => {
  const role = await Role.create(req.body);
  res.json(role);
});

// Delete a role by ID
router.delete('/:id', async (req, res) => {
  const result = await Role.destroy({ where: { id: req.params.id } });
  res.json(result);
});

module.exports = router;

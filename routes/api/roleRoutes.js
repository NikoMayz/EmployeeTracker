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
// Delete a role by ID
router.delete('/:id', async (req, res) => {
  try {
    // Find the manager's employees
    const employeesToUpdate = await Employee.findAll({ where: { manager_id: req.params.id } });
    // Update manager_id to null for all employees
    await Promise.all(employeesToUpdate.map(async employee => {
      await employee.update({ manager_id: null });
    }));
    // Delete the role
    await Role.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Role deleted successfully.' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ error: 'Error deleting role.' });
  }
});


module.exports = router;

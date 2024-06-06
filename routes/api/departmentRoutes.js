const router = require('express').Router();
const { Department, Employee, Role } = require('../../models');

// Get all departments
router.get('/', async (req, res) => {
  const departments = await Department.findAll();
  res.json(departments);
});

// Add a new department
router.post('/', async (req, res) => {
  const department = await Department.create(req.body);
  res.json(department);
});

// Delete a department by ID
router.delete('/:id', async (req, res) => {
  const result = await Department.destroy({ where: { id: req.params.id } });
  res.json(result);
});

// Get the total utilized budget of a department
router.get('/budget/:id', async (req, res) => {
  const budget = await Role.sum('salary', {
    include: [{
      model: Employee,
      attributes: [],
      where: { department_id: req.params.id }
    }]
  });
  res.json({ department_id: req.params.id, budget });
});

module.exports = router;

const router = require('express').Router();
const {Employee, Role, Department} = require('../../models');

// Get all employees with their roles and departments
router.get('/', async (req, res) => {
  const employees = await Employee.findAll({
    include: [Role, Department]
  });
  res.json(employees);
});

// Add a new employee
router.post('/', async (req, res) => {
  const employee = await Employee.create(req.body);
  res.json(employee);
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  const result = await Employee.destroy({ where: { id: req.params.id } });
  res.json(result);
});

// Update an employee's details by ID
router.put('/:id', async (req, res) => {
  const employee = await Employee.update(req.body, {
    where: { id: req.params.id }
  });
  res.json(employee);
});

// Get employees by manager ID
router.get('/manager/:manager_id', async (req, res) => {
  const employees = await Employee.findAll({
    where: { manager_id: req.params.manager_id }
  });
  res.json(employees);
});

// Get employees by department ID
router.get('/department/:department_id', async (req, res) => {
  const employees = await Employee.findAll({
    include: [{
      model: Role,
      where: { department_id: req.params.department_id }
    }]
  });
  res.json(employees);
});

module.exports = router;

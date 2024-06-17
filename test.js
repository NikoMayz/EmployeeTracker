const sequelize = require('../config/db.config');


const [results, metadata] = await sequelize.query(`
    SELECT "Departments"."name", SUM("Roles"."salary") AS "totalBudget"
    FROM "Departments"
    LEFT OUTER JOIN "Roles" ON "Departments"."id" = "Roles"."department_id"
    LEFT OUTER JOIN "Employees" ON "Roles"."id" = "Employees"."role_id"
    GROUP BY "Departments"."id"
`);
console.log(results);

import pool from '../db.js';

const getEmployees = async (req, res) => {
   try {
      const [result] = await pool.query('SELECT * FROM employee');
      res.send(result);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
const getEmployee = async (req, res) => {
   try {
      const { id } = req.params;
      const [result] = await pool.query('SELECT * FROM employee WHERE id = ?', [
         id,
      ]);
      if (result.length <= 0)
         return res.status(404).json({
            message: 'Employee not found.',
         });
      res.send(result[0]);
   } catch (error) {
      return res.status(500).json({
         message: 'Ha ocurrido un error!',
      });
   }
};
const createEmployees = async (req, res) => {
   try {
      const { name, salary } = req.body;

      const [result] = await pool.query(
         'INSERT INTO employee (name, salary) VALUES (?,?)',
         [name, salary]
      );
      console.log(result);
      res.send({
         id: result.insertId,
         name,
         salary,
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Ha ocurrido un error!',
      });
   }
};
const updateEmployees = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, salary } = req.body;

      const [result] = await pool.query(
         'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
         [name, salary, id]
      );
      if (result.affectedRows <= 0)
         return res.status(404).json({
            message: 'Employee not found.',
         });
      const [response] = await pool.query(
         'SELECT * FROM employee WHERE id = ?',
         [id]
      );
      res.send(response[0]);
   } catch (error) {
      return res.status(500).json({
         message: 'Ha ocurrido un error!',
      });
   }
};
const deleteEmployees = async (req, res) => {
   try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [
         id,
      ]);
      if (result.affectedRows <= 0)
         return res.status(404).json({
            message: 'Employee not found.',
         });
      res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({
         message: 'Ha ocurrido un error!',
      });
   }
};

export {
   getEmployees,
   createEmployees,
   updateEmployees,
   deleteEmployees,
   getEmployee,
};

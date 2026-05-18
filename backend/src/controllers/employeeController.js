const Employee = require('../models/Employee');
const { validateEmployee } = require('../middleware/validationMiddleware');

// Add Employee
const addEmployee = async (req, res, next) => {
  try {
    const { error } = validateEmployee(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details,
      });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists',
      });
    }

    const employee = new Employee(req.body);
    await employee.save();

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Employees
const getAllEmployees = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const employees = await Employee.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Employee.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      employees,
    });
  } catch (error) {
    next(error);
  }
};

// Search Employee
const searchEmployees = async (req, res, next) => {
  try {
    const { department, name, minScore, maxScore, experience } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (minScore || maxScore) {
      filter.performanceScore = {};
      if (minScore) filter.performanceScore.$gte = parseInt(minScore);
      if (maxScore) filter.performanceScore.$lte = parseInt(maxScore);
    }
    if (experience) filter.experience = { $gte: parseInt(experience) };

    const employees = await Employee.find(filter).sort({ performanceScore: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    next(error);
  }
};

// Get Employee by ID
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Update Employee
const updateEmployee = async (req, res, next) => {
  try {
    const { error } = validateEmployee(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details,
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Employee
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get Employee Analytics
const getAnalytics = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const avgPerformance = await Employee.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$performanceScore' },
          maxScore: { $max: '$performanceScore' },
          minScore: { $min: '$performanceScore' },
        },
      },
    ]);

    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgPerformance: { $avg: '$performanceScore' },
        },
      },
      { $sort: { avgPerformance: -1 } },
    ]);

    const topPerformers = await Employee.find()
      .sort({ performanceScore: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      analytics: {
        totalEmployees,
        performanceStats: avgPerformance[0] || {},
        departmentStats,
        topPerformers,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
};

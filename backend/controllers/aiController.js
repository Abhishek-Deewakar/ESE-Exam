const Employee = require('../models/Employee');
const aiService = require('../utils/aiService');

// Generate AI Recommendation for Single Employee
const getAIRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Generate AI recommendation
    const aiRecommendation = await aiService.generateRecommendations({
      name: employee.name,
      department: employee.department,
      performanceScore: employee.performanceScore,
      experience: employee.experience,
      skills: employee.skills,
    });

    // Update employee with AI recommendations
    employee.aiRecommendations = {
      ...aiRecommendation,
      generatedAt: new Date(),
    };

    await employee.save();

    res.status(200).json({
      success: true,
      message: 'AI recommendation generated successfully',
      recommendation: employee.aiRecommendations,
    });
  } catch (error) {
    next(error);
  }
};

// Bulk AI Recommendation for All Employees
const generateBulkRecommendations = async (req, res, next) => {
  try {
    const employees = await Employee.find({ status: 'active' });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No active employees found',
      });
    }

    const recommendations = [];

    for (const employee of employees) {
      try {
        const aiRecommendation = await aiService.generateRecommendations({
          name: employee.name,
          department: employee.department,
          performanceScore: employee.performanceScore,
          experience: employee.experience,
          skills: employee.skills,
        });

        employee.aiRecommendations = {
          ...aiRecommendation,
          generatedAt: new Date(),
        };

        await employee.save();
        recommendations.push({
          employeeId: employee._id,
          name: employee.name,
          recommendation: employee.aiRecommendations,
        });
      } catch (error) {
        console.error(`Error generating recommendation for ${employee.name}:`, error);
      }
    }

    res.status(200).json({
      success: true,
      message: `AI recommendations generated for ${recommendations.length} employees`,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// Rank All Employees
const rankEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ status: 'active' }).sort({
      performanceScore: -1,
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No active employees found',
      });
    }

    // Get AI ranking
    const rankingResult = await aiService.rankEmployees(employees);

    // Assign ranking numbers
    for (let i = 0; i < employees.length; i++) {
      if (!employees[i].aiRecommendations) {
        employees[i].aiRecommendations = {};
      }
      employees[i].aiRecommendations.ranking = i + 1;
      await employees[i].save();
    }

    res.status(200).json({
      success: true,
      message: 'Employee ranking generated successfully',
      totalEmployees: employees.length,
      ranking: employees.map((e) => ({
        rank: e.aiRecommendations.ranking || 0,
        employeeId: e._id,
        name: e.name,
        performanceScore: e.performanceScore,
        experience: e.experience,
      })),
      aiAnalysis: rankingResult,
    });
  } catch (error) {
    next(error);
  }
};

// Get Department Recommendations
const getDepartmentRecommendations = async (req, res, next) => {
  try {
    const { department } = req.params;

    const employees = await Employee.find({
      department,
      status: 'active',
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No active employees found in ${department} department`,
      });
    }

    const recommendations = [];

    for (const employee of employees) {
      try {
        const aiRecommendation = await aiService.generateRecommendations({
          name: employee.name,
          department: employee.department,
          performanceScore: employee.performanceScore,
          experience: employee.experience,
          skills: employee.skills,
        });

        employee.aiRecommendations = {
          ...aiRecommendation,
          generatedAt: new Date(),
        };

        await employee.save();
        recommendations.push({
          employeeId: employee._id,
          name: employee.name,
          performanceScore: employee.performanceScore,
          recommendation: employee.aiRecommendations,
        });
      } catch (error) {
        console.error(`Error generating recommendation for ${employee.name}:`, error);
      }
    }

    res.status(200).json({
      success: true,
      department,
      totalEmployees: recommendations.length,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// Promotion Candidates (High performers)
const getPromotionCandidates = async (req, res, next) => {
  try {
    const minScore = req.query.minScore || 80;

    const candidates = await Employee.find({
      performanceScore: { $gte: minScore },
      status: 'active',
    }).sort({ performanceScore: -1 });

    res.status(200).json({
      success: true,
      minScore,
      totalCandidates: candidates.length,
      candidates: candidates.map((e) => ({
        employeeId: e._id,
        name: e.name,
        department: e.department,
        performanceScore: e.performanceScore,
        experience: e.experience,
        promotionRecommendation: e.aiRecommendations?.promotionSuggestion || 'Pending analysis',
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAIRecommendation,
  generateBulkRecommendations,
  rankEmployees,
  getDepartmentRecommendations,
  getPromotionCandidates,
};

const reportService = require("./service");  // Importing the service
const validateReportData = require("./validation");  // Validation

// Method to get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await reportService.getReports();  // Fetching reports from the service
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// Method to update or create a report
exports.updateReport = async (req, res) => {
  try {
    // Validate input data
    validateReportData(req.body);  // Validating the incoming request body

    const reportData = req.body;  // Incoming data for the report
    const updatedReport = await reportService.updateReportData(reportData);  // Calling the service to update the report

    res.status(200).json(updatedReport);  // Returning the updated report
  } catch (error) {
    res.status(400).json({ message: error.message });  // Handling validation or other errors
  }
};

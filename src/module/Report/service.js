const Report = require("./model"); 

// Service function to fetch all reports
exports.getReports = async () => {
  try {
    // Fetch all reports from the database
    const reports = await Report.find();
    return reports;  // Returning the fetched reports
  } catch (error) {
    throw new Error("Error fetching reports");
  }
};

// Service function to update or create a report
exports.updateReportData = async (reportData) => {
  try {
    // Checking if a report already exists for the provided userId
    let report = await Report.findOne({ userId: reportData.userId });

    // If report does not exist, create a new one
    if (!report) {
      report = new Report(reportData);  // Creating a new report instance
    } else {
      // If report exists, update the data
      report.updateTotalOrders(reportData.totalOrders);
      report.updateSales(reportData.sales);
      report.updateOrders(reportData.orders);
      report.updateUsersAndIncome(reportData.totalUsers, reportData.overallIncome);
      report.updateProductStats(reportData.totalProductsSold, reportData.totalCategories);
      report.updateDiscountsApplied(reportData.discountsApplied);
    }

    // Saving the updated or new report to the database
    await report.save();
    return report;  // Returning the saved report
  } catch (error) {
    throw new Error("Error updating or creating report");
  }
};

// You can add more service functions to handle other operations

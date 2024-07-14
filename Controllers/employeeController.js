const Company = require("../models/companySchema");
const web3Utils = require("../solidity/web3");

const getEmployeeDetails = async (req, res) => {
  try {
    const companyName = req.user.companyName;
    const account = req.user.account;

    const companyObj = await Company.findOne({ companyName }).populate("emps");

    const employee = await web3Utils.getEmployeeDetails(
      companyObj.deployAccount,
      account
    );

    const result = {
      account: employee[0],
      salary: Number(employee[1]),
      payStartDate: Number(employee[2]),
      payStartEnd: Number(employee[3]),
    };

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = { getEmployeeDetails };

const Aadhaar = require("../models/aadhaarSchema");

// Function to update the status of an Aadhaar account
const updateAadhaarStatus = async (req, res) => {
  try {
    const account = req.user.account;
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Status must be a boolean" });
    }

    const aadhaar = await Aadhaar.findOneAndUpdate(
      { account },
      { status },
      { new: true }
    );

    if (!aadhaar) {
      return res.status(404).json({ message: "Aadhaar account not found" });
    }

    res
      .status(200)
      .json({ message: "Aadhaar status updated successfully", data: aadhaar });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

const getStatus = async (req, res) => {
  try {
    const account = req.user.account;

    const aadhaar = await Aadhaar.findOne({ account });
    if (!aadhaar) {
      return res.status(404).json({ message: "Aadhaar account not found" });
    }

    res.status(200).json({
      message: "Aadhaar status retrieved successfully",
      data: { account: aadhaar.account, status: aadhaar.status },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  updateAadhaarStatus,
  getStatus,
};

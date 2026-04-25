const ApprovedVendor = require('../models/ApprovedVendor');

/**
 * Returns 'approved' if vendorName exists in ApprovedVendor collection,
 * otherwise returns 'pending'.
 */
const getApprovalStatus = async (vendorName) => {
  if (!vendorName) return 'pending';

  const match = await ApprovedVendor.findOne({
    name: vendorName.trim().toLowerCase()
  });

  return match ? 'approved' : 'pending';
};

module.exports = { getApprovalStatus };
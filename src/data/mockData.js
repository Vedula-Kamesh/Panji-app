// src/data/mockData.js

export const fetchDashboardMetrics = () => {
  return Promise.resolve([
    { title: "Total Revenue", value: "₹95.2L", trend: "+12.5%", isUp: true, iconBg: "#DCFCE7", iconColor: "#166534", icon: "$" },
    { title: "Orders Today", value: "268", trend: "+8.3%", isUp: true, iconBg: "#DBEAFE", iconColor: "#1D4ED8", icon: "🛒" },
    { title: "Active Loans", value: "145", trend: "+5.2%", isUp: true, iconBg: "#F3E8FF", iconColor: "#7E22CE", icon: "💳" },
    { title: "Default Rate", value: "2.1%", trend: "-0.5%", isUp: false, iconBg: "#FEE2E2", iconColor: "#991B1B", icon: "📉" },
    { title: "Active Users", value: "1,245", trend: "+15.8%", isUp: true, iconBg: "#E0E7FF", iconColor: "#4338CA", icon: "👥" },
    { title: "Pending Orders", value: "32", trend: "-12.3%", isUp: false, iconBg: "#FFEDD5", iconColor: "#C2410C", icon: "⏱️" },
    { title: "Commission Earned", value: "₹4.8L", trend: "+18.2%", isUp: true, iconBg: "#CCFBF1", iconColor: "#0F766E", icon: "%" },
    { title: "GST Collected", value: "₹12.5L", trend: "+14.7%", isUp: true, iconBg: "#E0F2FE", iconColor: "#0369A1", icon: "📄" }
  ]);
};

export const fetchUsers = () => {
  return Promise.resolve([
    { id: "U-1001", name: "Rajesh Kumar", verified: true, mobile: "+91 98765 43210", orders: 45, loanLimit: "₹5.0L", rating: 4.8, status: "active" },
    { id: "U-1002", name: "Priya Sharma", verified: true, mobile: "+91 98765 43211", orders: 32, loanLimit: "₹3.5L", rating: 4.5, status: "active" },
    { id: "U-1003", name: "Amit Patel", verified: true, mobile: "+91 98765 43212", orders: 78, loanLimit: "₹8.0L", rating: 4.9, status: "active" },
    { id: "U-1004", name: "Sneha Reddy", verified: false, mobile: "+91 98765 43213", orders: 12, loanLimit: "₹2.0L", rating: 3.8, status: "pending" },
    { id: "U-1005", name: "Vikram Singh", verified: false, mobile: "+91 98765 43214", orders: 0, loanLimit: "₹0", rating: null, status: "suspended" },
    { id: "U-1006", name: "Anita Gupta", verified: true, mobile: "+91 98765 43215", orders: 56, loanLimit: "₹6.5L", rating: 4.7, status: "active" }
  ]);
};

// Append to src/data/mockData.js

export const fetchOrders = () => {
  return Promise.resolve([
    { id: "ORD-12456", retailer: "Rajesh Kumar", wholesaler: "ABC Distributors", amount: "₹45,000", paymentType: "Loan + UPI", loanUsed: "₹30,000", status: "completed", date: "20 Feb 2026" },
    { id: "ORD-12455", retailer: "Priya Sharma", wholesaler: "XYZ Supplies", amount: "₹32,000", paymentType: "UPI", loanUsed: "-", status: "pending", date: "20 Feb 2026" },
    { id: "ORD-12454", retailer: "Amit Patel", wholesaler: "Global Traders", amount: "₹78,000", paymentType: "Loan", loanUsed: "₹78,000", status: "processing", date: "19 Feb 2026" },
    { id: "ORD-12453", retailer: "Sneha Reddy", wholesaler: "ABC Distributors", amount: "₹25,000", paymentType: "Bank Transfer", loanUsed: "-", status: "completed", date: "19 Feb 2026" },
    { id: "ORD-12452", retailer: "Vikram Singh", wholesaler: "Metro Wholesale", amount: "₹54,000", paymentType: "Loan + UPI", loanUsed: "₹40,000", status: "failed", date: "18 Feb 2026" },
  ]);
};

export const fetchLoans = () => {
  return Promise.resolve([
    { id: "LN-2001", retailer: "Rajesh Kumar", requested: "₹2.5L", approved: "₹2.5L", duration: "12 months", risk: 85, riskLabel: "Low Risk", status: "active", date: "10 Feb 2026" },
    { id: "LN-2002", retailer: "Priya Sharma", requested: "₹3.0L", approved: "₹2.8L", duration: "12 months", risk: 78, riskLabel: "Medium Risk", status: "active", date: "08 Feb 2026" },
    { id: "LN-2003", retailer: "Amit Patel", requested: "₹5.0L", approved: "-", duration: "18 months", risk: 45, riskLabel: "High Risk", status: "pending", date: "20 Feb 2026" },
    { id: "LN-2004", retailer: "Sneha Reddy", requested: "₹1.8L", approved: "₹1.8L", duration: "6 months", risk: 92, riskLabel: "Low Risk", status: "completed", date: "05 Jan 2026" },
  ]);
};

export const fetchFinance = () => {
  return Promise.resolve([
    { id: "TXN-5001", ref: "ORD-12456", date: "20 Feb 2026", type: "order", amount: "₹45,000", commission: "₹2,250", gst: "₹405", status: "completed" },
    { id: "TXN-5002", ref: "ORD-12455", date: "20 Feb 2026", type: "order", amount: "₹32,000", commission: "₹1,600", gst: "₹288", status: "pending" },
    { id: "TXN-5003", ref: "LN-2001", date: "19 Feb 2026", type: "loan", amount: "₹2,50,000", commission: "₹5,000", gst: "₹900", status: "completed" },
  ]);
};

export const fetchRisk = () => {
  return Promise.resolve([
    { id: "RISK-001", user: "Vikram Singh", type: "Multiple Failed Payments", level: "HIGH", amount: "₹54,000" },
    { id: "RISK-002", user: "Meera Joshi", type: "Unusual Transaction Pattern", level: "MEDIUM", amount: "₹2.5L" },
    { id: "RISK-003", user: "Suresh Nair", type: "Duplicate Account Detection", level: "HIGH", amount: "₹0" },
  ]);
};
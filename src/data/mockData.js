// src/data/mockData.js

export const fetchDashboardMetrics = () => {
  return Promise.resolve([
    // ROW 1
    { title: "Total Revenue", value: "₹95.2L", trend: "+12.5%", isUp: true, iconBg: "#DCFCE7", iconColor: "#166534", icon: "$" },
    { title: "Orders Today", value: "268", trend: "+8.3%", isUp: true, iconBg: "#DBEAFE", iconColor: "#1D4ED8", icon: "🛒" },
    { title: "Active Loans", value: "145", trend: "+5.2%", isUp: true, iconBg: "#F3E8FF", iconColor: "#7E22CE", icon: "💳" },
    { title: "Default Rate", value: "2.1%", trend: "-0.5%", isUp: false, iconBg: "#FEE2E2", iconColor: "#991B1B", icon: "📉" },
    
    // ROW 2
    { title: "Active Users", value: "1,245", trend: "+15.8%", isUp: true, iconBg: "#E0E7FF", iconColor: "#4338CA", icon: "👥" },
    { title: "Pending Orders", value: "32", trend: "-12.3%", isUp: false, iconBg: "#FFEDD5", iconColor: "#C2410C", icon: "⏱️" },
    { title: "Commission Earned", value: "₹4.8L", trend: "+18.2%", isUp: true, iconBg: "#CCFBF1", iconColor: "#0F766E", icon: "%" },
    { title: "GST Collected", value: "₹12.5L", trend: "+14.7%", isUp: true, iconBg: "#E0F2FE", iconColor: "#0369A1", icon: "📄" },
    
    // ROW 3
    // Removed isGreenCard and applied standard warning colors (yellow/orange) to the icon
    { title: "Total Products", value: "8,500+", trend: "+20.3%", isUp: true, iconBg: "#FEF3C7", iconColor: "#D97706", icon: "📦" }
  ]);
};

export const fetchUsers = () => {
  return Promise.resolve([
    { id: "U-1001", type: "retailer", name: "Rajesh Kumar", businessName: "Rajesh Kirana Store", verified: true, kycStatus: "Approved", mobile: "+91 98765 43210", address: "Sector 14, Gurugram", orders: 45, existingLoan: "₹2.5L", rating: 4.8, status: "active" },
    { id: "U-1002", type: "retailer", name: "Priya Sharma", businessName: "Sharma Provisions", verified: true, kycStatus: "Approved", mobile: "+91 98765 43211", address: "Vasant Kunj, Delhi", orders: 32, existingLoan: "₹2.8L", rating: 4.5, status: "active" },
    { id: "U-1003", type: "wholesaler", name: "Amit Patel", businessName: "Patel Mart", verified: true, kycStatus: "Approved", mobile: "+91 98765 43212", address: "SG Highway, Ahmedabad", orders: 78, existingLoan: "₹4.5L", rating: 4.9, status: "active" },
    { id: "U-1004", type: "retailer", name: "Sneha Reddy", businessName: "Reddy General Store", verified: false, kycStatus: "Pending", mobile: "+91 98765 43213", address: "Banjara Hills, Hyderabad", orders: 12, existingLoan: "₹0", rating: 3.8, status: "pending" },
    { id: "U-1005", type: "wholesaler", name: "Vikram Singh", businessName: "Singh Traders", verified: false, kycStatus: "Rejected", mobile: "+91 98765 43214", address: "Civil Lines, Jaipur", orders: 0, existingLoan: "₹0", rating: null, status: "suspended" },
    { id: "U-1006", type: "retailer", name: "Anita Gupta", businessName: "Gupta Supermarket", verified: true, kycStatus: "Approved", mobile: "+91 98765 43215", address: "Andheri West, Mumbai", orders: 56, existingLoan: "₹3.5L", rating: 4.7, status: "active" }
  ]);
};

export const fetchOrders = () => {
  return Promise.resolve([
    { 
      id: "ORD-12456", retailer: "Rajesh Kumar", wholesaler: "ABC Distributors", amount: "₹45,000", paymentType: "Loan + UPI", loanUsed: "₹30,000", status: "completed", date: "20 Feb 2026",
      paymentProof: "receipt_UPI_12456.jpg",
      retailerConfirmation: { status: "Confirmed", date: "22 Feb, 03:15 PM", method: "OTP Verified (8842)" },
      items: [
        { name: "Basmati Rice Premium (25kg)", qty: 5, price: "₹12,500" },
        { name: "Aashirvaad Atta (10kg)", qty: 50, price: "₹22,500" },
        { name: "Refined Sunflower Oil (15L)", qty: 5, price: "₹10,000" }
      ],
      tracking: [
        { step: "Order Placed", time: "20 Feb, 10:00 AM", done: true },
        { step: "Payment Confirmed", time: "20 Feb, 10:15 AM", done: true },
        { step: "Shipped by Wholesaler", time: "21 Feb, 09:00 AM", done: true },
        { step: "Delivered to Retailer", time: "22 Feb, 02:30 PM", done: true }
      ]
    },
    { 
      id: "ORD-12455", retailer: "Priya Sharma", wholesaler: "XYZ Supplies", amount: "₹32,000", paymentType: "UPI", loanUsed: "-", status: "pending", date: "20 Feb 2026",
      paymentProof: "receipt_UPI_12455.pdf",
      retailerConfirmation: { status: "Pending", date: "-", method: "-" },
      items: [
        { name: "Detergent Powder (5kg)", qty: 20, price: "₹18,000" },
        { name: "Dishwash Bar (Pack of 12)", qty: 10, price: "₹14,000" }
      ],
      tracking: [
        { step: "Order Placed", time: "20 Feb, 14:00 PM", done: true },
        { step: "Payment Pending", time: "-", done: false },
        { step: "Shipped by Wholesaler", time: "-", done: false },
        { step: "Delivered to Retailer", time: "-", done: false }
      ]
    },
    { 
      id: "ORD-12454", retailer: "Amit Patel", wholesaler: "Global Traders", amount: "₹78,000", paymentType: "Loan", loanUsed: "₹78,000", status: "processing", date: "19 Feb 2026",
      paymentProof: null,
      retailerConfirmation: { status: "Pending", date: "-", method: "-" },
      items: [
        { name: "Mixed Dal Value Pack (100kg)", qty: 1, price: "₹45,000" },
        { name: "Sugar Premium (50kg)", qty: 10, price: "₹33,000" }
      ],
      tracking: [
        { step: "Order Placed", time: "19 Feb, 09:30 AM", done: true },
        { step: "Loan Approved", time: "19 Feb, 09:45 AM", done: true },
        { step: "Packing in Progress", time: "20 Feb, 11:00 AM", done: true },
        { step: "Shipped by Wholesaler", time: "-", done: false }
      ]
    },
    { 
      id: "ORD-12453", retailer: "Sneha Reddy", wholesaler: "ABC Distributors", amount: "₹25,000", paymentType: "Bank Transfer", loanUsed: "-", status: "completed", date: "19 Feb 2026",
      paymentProof: "bank_ref_5543.pdf",
      retailerConfirmation: { status: "Confirmed", date: "21 Feb, 01:45 PM", method: "Digital Signature" },
      items: [
        { name: "Turmeric Powder (1kg)", qty: 25, price: "₹5,000" },
        { name: "Red Chilli Powder (1kg)", qty: 20, price: "₹6,000" },
        { name: "Coriander Seeds (5kg)", qty: 10, price: "₹14,000" }
      ],
      tracking: [
        { step: "Order Placed", time: "19 Feb, 10:00 AM", done: true },
        { step: "Payment Confirmed", time: "19 Feb, 11:30 AM", done: true },
        { step: "Shipped by Wholesaler", time: "19 Feb, 04:00 PM", done: true },
        { step: "Delivered to Retailer", time: "21 Feb, 01:15 PM", done: true }
      ]
    },
    { 
      id: "ORD-12452", retailer: "Vikram Singh", wholesaler: "Metro Wholesale", amount: "₹54,000", paymentType: "Loan + UPI", loanUsed: "₹40,000", status: "failed", date: "18 Feb 2026",
      paymentProof: null,
      retailerConfirmation: { status: "Cancelled", date: "-", method: "-" },
      items: [
        { name: "Assorted Biscuits Combo", qty: 50, price: "₹24,000" },
        { name: "Tea Powder Premium (5kg)", qty: 15, price: "₹30,000" }
      ],
      tracking: [
        { step: "Order Placed", time: "18 Feb, 08:00 AM", done: true },
        { step: "Payment Failed", time: "18 Feb, 08:05 AM", done: false },
        { step: "Order Cancelled", time: "-", done: false }
      ]
    }
  ]);
};

export const fetchLoans = () => {
  return Promise.resolve([
    { 
      id: "LN-2001", orderId: "ORD-12456", retailer: "Rajesh Kumar", requested: "₹2.5L", approved: "₹2.5L", duration: "12 months", risk: 85, riskLabel: "Low Risk", status: "active", date: "10 Feb 2026",
      documents: [
        { title: "Owner KYC (Aadhar)", file: "Rajesh_Aadhar.pdf" },
        { title: "Business Proof (GST)", file: "Rajesh_GST_Cert.pdf" },
        { title: "Bank Statement (Last 6 Months)", file: "Rajesh_Bank_Stmt.pdf" }
      ],
      emis: [
        { inst: "1/12", dueDate: "10 Mar 2026", amount: "₹22,500", outstanding: "₹2,27,500", overdue: "0", paymentDetails: "Pending Auto-Debit", status: "pending" },
        { inst: "2/12", dueDate: "10 Apr 2026", amount: "₹22,500", outstanding: "₹2,05,000", overdue: "0", paymentDetails: "-", status: "upcoming" }
      ],
      history: [
        { pastId: "LN-1050", orderId: "ORD-09821", amount: "₹1.0L", repaidOn: "05 Jan 2026", status: "completed", delays: 0 },
        { pastId: "LN-0820", orderId: "ORD-08112", amount: "₹50,000", repaidOn: "12 Oct 2025", status: "completed", delays: 0 }
      ]
    },
    { 
      id: "LN-2002", orderId: "ORD-12455", retailer: "Priya Sharma", requested: "₹3.0L", approved: "₹2.8L", duration: "12 months", risk: 78, riskLabel: "Medium Risk", status: "active", date: "08 Feb 2026",
      documents: [
        { title: "Owner KYC (PAN)", file: "Priya_PAN.pdf" },
        { title: "Business Registration", file: "Sharma_Prov_Reg.pdf" }
      ],
      emis: [
        { inst: "1/12", dueDate: "08 Mar 2026", amount: "₹25,200", outstanding: "₹2,54,800", overdue: "0", paymentDetails: "-", status: "pending" }
      ],
      history: [
        { pastId: "LN-1102", orderId: "ORD-10550", amount: "₹2.0L", repaidOn: "10 Nov 2025", status: "completed", delays: 2 }
      ]
    },
    { 
      id: "LN-2003", orderId: "ORD-12454", retailer: "Amit Patel", requested: "₹5.0L", approved: "-", duration: "18 months", risk: 45, riskLabel: "High Risk", status: "pending", date: "20 Feb 2026",
      documents: [
        { title: "Owner KYC (Aadhar)", file: "Amit_Aadhar.pdf" },
        { title: "ITR (Last 2 Years)", file: "Amit_ITR_24_25.pdf" }
      ],
      emis: [],
      history: [
        { pastId: "LN-0995", orderId: "ORD-09011", amount: "₹4.5L", repaidOn: "-", status: "defaulted", delays: 5 }
      ]
    },
    { 
      id: "LN-2004", orderId: "ORD-12453", retailer: "Sneha Reddy", requested: "₹1.8L", approved: "₹1.8L", duration: "6 months", risk: 92, riskLabel: "Low Risk", status: "completed", date: "05 Jan 2026",
      documents: [], 
      emis: [
        { inst: "6/6", dueDate: "05 Jul 2026", amount: "₹31,500", outstanding: "₹0", overdue: "0", paymentDetails: "UPI TXN-98921", status: "completed" }
      ],
      history: []
    },
    { 
      id: "LN-2005", orderId: "ORD-12452", retailer: "Anita Gupta", requested: "₹4.0L", approved: "₹3.5L", duration: "24 months", risk: 72, riskLabel: "Medium Risk", status: "active", date: "15 Jan 2026",
      documents: [
        { title: "Business Proof (GST)", file: "Gupta_Supermarket_GST.pdf" }
      ],
      emis: [
        { inst: "1/24", dueDate: "15 Feb 2026", amount: "₹16,000", outstanding: "₹3,34,000", overdue: "0", paymentDetails: "Bank Trf Ref-1102", status: "completed" },
        { inst: "2/24", dueDate: "15 Mar 2026", amount: "₹16,000", outstanding: "₹3,18,000", overdue: "1", paymentDetails: "Payment Failed", status: "pending" }
      ],
      history: [
        { pastId: "LN-1205", orderId: "ORD-11200", amount: "₹1.5L", repaidOn: "20 Dec 2025", status: "completed", delays: 1 }
      ]
    }
  ]);
};

export const fetchFinance = () => {
  return Promise.resolve([
    { id: "TXN-5001", ref: "ORD-12456", date: "20 Feb 2026", type: "order", amount: "₹45,000", commission: "₹2,250", gst: "₹405", status: "completed" },
    { id: "TXN-5002", ref: "ORD-12455", date: "20 Feb 2026", type: "order", amount: "₹32,000", commission: "₹1,600", gst: "₹288", status: "pending" },
    { id: "TXN-5003", ref: "LN-2001", date: "19 Feb 2026", type: "loan", amount: "₹2,50,000", commission: "₹5,000", gst: "₹900", status: "completed" },
    { id: "TXN-5004", ref: "ORD-12454", date: "19 Feb 2026", type: "order", amount: "₹78,000", commission: "₹3,900", gst: "₹702", status: "completed" },
    { id: "TXN-5005", ref: "ORD-12452", date: "18 Feb 2026", type: "order", amount: "₹54,000", commission: "₹0", gst: "₹0", status: "failed" }
  ]);
};

export const fetchRisk = () => {
  return Promise.resolve([
    { id: "RISK-001", user: "Vikram Singh", type: "Multiple Failed Payments", level: "HIGH", amount: "₹54,000" },
    { id: "RISK-002", user: "Amit Patel", type: "Previous Defaulted Loan", level: "HIGH", amount: "₹5.0L" },
    { id: "RISK-003", user: "Meera Joshi", type: "Unusual Transaction Pattern", level: "MEDIUM", amount: "₹2.5L" },
    { id: "RISK-004", user: "Suresh Nair", type: "Duplicate Account Detection", level: "HIGH", amount: "₹0" }
  ]);
};

// NEW: fetchRecentActivity for Dashboard Summary (bottom section of Dashboard)
export const fetchRecentActivity = () => {
  return Promise.resolve([
    { date: "20 Feb 2026", time: "14:30 PM", action: "Exported Users (Active)", type: "user", user: "Rajesh Kumar", ip: "192.168.1.45" },
    { date: "20 Feb 2026", time: "10:15 AM", action: "Approved Loan LN-2001", type: "loan", user: "Rajesh Kumar", ip: "192.168.1.45" },
    { date: "19 Feb 2026", time: "09:00 AM", action: "Admin Login", type: "system", user: "Super Admin", ip: "192.168.1.45" },
    { date: "19 Feb 2026", time: "16:45 PM", action: "Rejected Loan LN-2003", type: "loan", user: "Amit Patel", ip: "192.168.1.45" },
    { date: "19 Feb 2026", time: "11:20 AM", action: "Updated KYC Sneha Reddy", type: "user", user: "Sneha Reddy", ip: "192.168.1.45" },
    { date: "19 Feb 2026", time: "10:05 AM", action: "Exported Orders Today", type: "order", user: "Sneha Reddy", ip: "192.168.1.45" },
  ]);
};
import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, Users, FileText, CreditCard, Phone, Mail, 
  Calendar, Download, RefreshCw, CheckCircle, Clock, XCircle,
  ChevronDown, ChevronUp, Search, Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('callbacks');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [callbacks, setCallbacks] = useState([]);
  const [eoiSubmissions, setEoiSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  // Check if already logged in
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        sessionStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchAllData();
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, callbacksRes, eoiRes, paymentsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`),
        fetch(`${API_URL}/api/admin/callbacks`),
        fetch(`${API_URL}/api/admin/eoi`),
        fetch(`${API_URL}/api/admin/payments`)
      ]);

      const statsData = await statsRes.json();
      const callbacksData = await callbacksRes.json();
      const eoiData = await eoiRes.json();
      const paymentsData = await paymentsRes.json();

      setStats(statsData);
      setCallbacks(callbacksData.data || []);
      setEoiSubmissions(eoiData.data || []);
      setPayments(paymentsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      submitted: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      created: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const exportToCSV = (data, filename) => {
    if (!data.length) return;
    
    const flattenObject = (obj, prefix = '') => {
      return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}_${key}` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          Object.assign(acc, flattenObject(value, newKey));
        } else {
          acc[newKey] = value;
        }
        return acc;
      }, {});
    };

    const flatData = data.map(item => flattenObject(item));
    const headers = Object.keys(flatData[0]);
    const csvContent = [
      headers.join(','),
      ...flatData.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredCallbacks = callbacks.filter(cb =>
    cb.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cb.phone?.includes(searchTerm) ||
    cb.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEOI = eoiSubmissions.filter(eoi =>
    eoi.applicant1?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eoi.applicant1?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eoi.eoi_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#084a61] to-[#0a5d7a] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#084a61] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display text-[#084a61]">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2">Vacation Village</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#084a61] focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#084a61] focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}

            <Button type="submit" className="w-full bg-[#084a61] hover:bg-[#0a5d7a] text-white py-3">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display text-[#084a61]">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Vacation Village Chikkamagaluru</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={fetchAllData}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#084a61]">{stats.callbacks}</p>
                  <p className="text-sm text-gray-500">Callback Requests</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#084a61]">{stats.eoi_submissions}</p>
                  <p className="text-sm text-gray-500">EOI Submissions</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#084a61]">{stats.total_payments}</p>
                  <p className="text-sm text-gray-500">Total Payments</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#084a61]">{stats.successful_payments}</p>
                  <p className="text-sm text-gray-500">Successful Payments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('callbacks')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'callbacks'
                    ? 'text-[#084a61] border-b-2 border-[#084a61] bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Callback Requests ({callbacks.length})
              </button>
              <button
                onClick={() => setActiveTab('eoi')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'eoi'
                    ? 'text-[#084a61] border-b-2 border-[#084a61] bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                EOI Submissions ({eoiSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'text-[#084a61] border-b-2 border-[#084a61] bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payments ({payments.length})
              </button>
            </div>
          </div>

          {/* Search and Export */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#084a61] focus:border-transparent"
              />
            </div>
            <Button
              onClick={() => {
                if (activeTab === 'callbacks') exportToCSV(callbacks, 'callback_requests');
                else if (activeTab === 'eoi') exportToCSV(eoiSubmissions, 'eoi_submissions');
                else exportToCSV(payments, 'payments');
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-[#084a61] mx-auto mb-4" />
                <p className="text-gray-500">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Callbacks Tab */}
                {activeTab === 'callbacks' && (
                  <div className="overflow-x-auto">
                    {filteredCallbacks.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        No callback requests found
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500 border-b">
                            <th className="pb-3 font-medium">Name</th>
                            <th className="pb-3 font-medium">Phone</th>
                            <th className="pb-3 font-medium">Email</th>
                            <th className="pb-3 font-medium">Message</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCallbacks.map((cb, index) => (
                            <tr key={cb.id || index} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="py-4 font-medium text-[#084a61]">{cb.name}</td>
                              <td className="py-4">
                                <a href={`tel:${cb.phone}`} className="text-blue-600 hover:underline">
                                  {cb.phone}
                                </a>
                              </td>
                              <td className="py-4">
                                {cb.email ? (
                                  <a href={`mailto:${cb.email}`} className="text-blue-600 hover:underline">
                                    {cb.email}
                                  </a>
                                ) : '-'}
                              </td>
                              <td className="py-4 text-gray-600 max-w-xs truncate">{cb.message || '-'}</td>
                              <td className="py-4 text-sm text-gray-500">{formatDate(cb.created_at)}</td>
                              <td className="py-4">{getStatusBadge(cb.status)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* EOI Tab */}
                {activeTab === 'eoi' && (
                  <div className="space-y-4">
                    {filteredEOI.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        No EOI submissions found
                      </div>
                    ) : (
                      filteredEOI.map((eoi, index) => (
                        <div 
                          key={eoi.id || index} 
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <div 
                            className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                            onClick={() => setExpandedRow(expandedRow === eoi.id ? null : eoi.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-medium text-[#084a61]">{eoi.applicant1?.name}</p>
                                <p className="text-sm text-gray-500">{eoi.eoi_number}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">{eoi.plot_type} - {eoi.plot_area}</p>
                                <p className="text-xs text-gray-500">{formatDate(eoi.created_at)}</p>
                              </div>
                              {getStatusBadge(eoi.status)}
                              {expandedRow === eoi.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          {expandedRow === eoi.id && (
                            <div className="p-4 border-t border-gray-200 bg-white">
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Applicant 1 */}
                                <div>
                                  <h4 className="font-medium text-[#084a61] mb-3">Primary Applicant</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Name:</span> {eoi.applicant1?.name}</p>
                                    <p><span className="text-gray-500">Email:</span> {eoi.applicant1?.email}</p>
                                    <p><span className="text-gray-500">Phone:</span> {eoi.applicant1?.mobile}</p>
                                    <p><span className="text-gray-500">PAN:</span> {eoi.applicant1?.pan || '-'}</p>
                                    <p><span className="text-gray-500">Address:</span> {eoi.applicant1?.address || '-'}</p>
                                  </div>
                                </div>
                                
                                {/* Applicant 2 */}
                                {eoi.applicant2?.name && (
                                  <div>
                                    <h4 className="font-medium text-[#084a61] mb-3">Co-Applicant</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="text-gray-500">Name:</span> {eoi.applicant2?.name}</p>
                                      <p><span className="text-gray-500">Email:</span> {eoi.applicant2?.email}</p>
                                      <p><span className="text-gray-500">Phone:</span> {eoi.applicant2?.mobile}</p>
                                      <p><span className="text-gray-500">PAN:</span> {eoi.applicant2?.pan || '-'}</p>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Plot Details */}
                                <div>
                                  <h4 className="font-medium text-[#084a61] mb-3">Plot Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Plot Type:</span> {eoi.plot_type}</p>
                                    <p><span className="text-gray-500">Plot Area:</span> {eoi.plot_area}</p>
                                    <p><span className="text-gray-500">EOI Amount:</span> {eoi.eoi_amount}</p>
                                    <p><span className="text-gray-500">Total Consideration:</span> {eoi.total_consideration}</p>
                                    <p><span className="text-gray-500">Financing:</span> {eoi.financing_type}</p>
                                  </div>
                                </div>
                                
                                {/* Payment Details */}
                                <div>
                                  <h4 className="font-medium text-[#084a61] mb-3">Payment Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Method:</span> {eoi.payment_method}</p>
                                    <p><span className="text-gray-500">Payment Status:</span> {getStatusBadge(eoi.payment_status || 'pending')}</p>
                                    {eoi.razorpay_payment_id && (
                                      <p><span className="text-gray-500">Razorpay ID:</span> {eoi.razorpay_payment_id}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                  <div className="overflow-x-auto">
                    {payments.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        No payments found
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500 border-b">
                            <th className="pb-3 font-medium">Order ID</th>
                            <th className="pb-3 font-medium">Applicant</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Payment ID</th>
                            <th className="pb-3 font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((payment, index) => (
                            <tr key={payment.id || index} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="py-4 font-mono text-sm">{payment.razorpay_order_id}</td>
                              <td className="py-4">
                                <p className="font-medium text-[#084a61]">{payment.applicant_name}</p>
                                <p className="text-sm text-gray-500">{payment.applicant_email}</p>
                              </td>
                              <td className="py-4 font-medium">₹{(payment.amount / 100).toLocaleString('en-IN')}</td>
                              <td className="py-4">{getStatusBadge(payment.status)}</td>
                              <td className="py-4 font-mono text-sm">{payment.razorpay_payment_id || '-'}</td>
                              <td className="py-4 text-sm text-gray-500">{formatDate(payment.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

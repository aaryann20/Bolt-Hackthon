import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Download, FileJson, GitBranch, History, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const vulnerabilityData = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 8 },
  { name: 'May', count: 25 },
  { name: 'Jun', count: 17 }
];

const gasUsageData = [
  { name: 'Function A', gas: 45000 },
  { name: 'Function B', gas: 32000 },
  { name: 'Function C', gas: 28000 },
  { name: 'Function D', gas: 52000 },
  { name: 'Function E', gas: 38000 }
];

const FullReport: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="btn-primary flex items-center py-2 px-4">
                <Shield className="w-4 h-4 mr-2" />
                Run New Audit
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Security Analysis Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <span className="text-2xl font-bold text-red-600">3</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-red-600">Critical Issues</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-600">5</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-orange-600">Medium Risk</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">12</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-green-600">Passed Checks</p>
                </div>
              </div>
            </div>

            {/* Vulnerability Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-6">Vulnerability Trends</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vulnerabilityData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gas Usage Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-6">Gas Usage Analysis</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gasUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="gas" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contract Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Contract Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileJson className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Contract Name</p>
                    <p className="text-sm text-gray-600">TokenSale.sol</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GitBranch className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Solidity Version</p>
                    <p className="text-sm text-gray-600">^0.8.0</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <History className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Last Audit</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-secondary py-2 px-4 flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Schedule Regular Audit
                </button>
                <button className="w-full btn-secondary py-2 px-4 flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullReport;
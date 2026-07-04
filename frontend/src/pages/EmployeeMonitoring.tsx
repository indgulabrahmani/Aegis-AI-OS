import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, TrendingUp, TrendingDown, Clock, Calendar } from 'lucide-react';

type EmployeeStatus = 'online' | 'offline' | 'in_meeting' | 'working' | 'on_leave';

interface Employee {
  id: number;
  name: string;
  department: string;
  status: EmployeeStatus;
  currentTask: string;
  productivityPct: number;
  meetingStatus: string;
  attendance: string;
  performance: number;
  aiSummary: string;
  meetingHistory: number;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    department: 'Engineering',
    status: 'online',
    currentTask: 'Implementing API endpoints',
    productivityPct: 92,
    meetingStatus: 'Available',
    attendance: 'Present',
    performance: 4.8,
    aiSummary: 'On track, completed 4/5 tasks today, no blockers reported.',
    meetingHistory: 3
  },
  {
    id: 2,
    name: 'James Wilson',
    department: 'Design',
    status: 'in_meeting',
    currentTask: 'Product design review',
    productivityPct: 85,
    meetingStatus: 'In meeting',
    attendance: 'Present',
    performance: 4.5,
    aiSummary: 'Strong performance on UI components, slight delay on deliverables.',
    meetingHistory: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    department: 'Marketing',
    status: 'working',
    currentTask: 'Campaign analytics',
    productivityPct: 78,
    meetingStatus: 'Available',
    attendance: 'Present',
    performance: 4.2,
    aiSummary: 'Good progress on campaigns, needs support on data analysis.',
    meetingHistory: 2
  },
  {
    id: 4,
    name: 'Michael Brown',
    department: 'Engineering',
    status: 'offline',
    currentTask: 'Code review pending',
    productivityPct: 65,
    meetingStatus: 'Offline',
    attendance: 'Late',
    performance: 3.9,
    aiSummary: 'Behind schedule, requires intervention on priority tasks.',
    meetingHistory: 4
  },
  {
    id: 5,
    name: 'Lisa Park',
    department: 'HR',
    status: 'on_leave',
    currentTask: 'N/A',
    productivityPct: 0,
    meetingStatus: 'On leave',
    attendance: 'On leave',
    performance: 4.7,
    aiSummary: 'On approved leave until next week.',
    meetingHistory: 1
  },
  {
    id: 6,
    name: 'David Kim',
    department: 'Finance',
    status: 'online',
    currentTask: 'Budget analysis',
    productivityPct: 88,
    meetingStatus: 'Available',
    attendance: 'Present',
    performance: 4.6,
    aiSummary: 'Excellent progress on financial reports, ahead of schedule.',
    meetingHistory: 3
  }
];

const statusColors: Record<EmployeeStatus, string> = {
  online: 'bg-success/20 text-success border-success/30',
  offline: 'bg-textMuted/20 text-textMuted border-textMuted/30',
  in_meeting: 'bg-warning/20 text-warning border-warning/30',
  working: 'bg-primary/20 text-primary border-primary/30',
  on_leave: 'bg-accent/20 text-accent border-accent/30'
};

const statusLabels: Record<EmployeeStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  in_meeting: 'In Meeting',
  working: 'Working',
  on_leave: 'On Leave'
};

export function EmployeeMonitoring() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const departments = ['all', ...Array.from(new Set(employees.map(e => e.department)))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-text mb-2">Employee Monitoring</h1>
        <p className="text-textMuted">Track team performance, status, and productivity in real-time</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-6"
      >
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface/50 border border-border/50 rounded-xl text-text placeholder:text-textMuted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-textMuted" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 bg-surface/50 border border-border/50 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-textMuted" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-surface/50 border border-border/50 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="in_meeting">In Meeting</option>
              <option value="working">Working</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Department</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Today's Status</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Current Task</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Productivity %</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Meeting Status</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Attendance</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Performance</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">AI Summary</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted">Meeting History</th>
                <th className="text-left p-4 text-sm font-semibold text-textMuted"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-border/30 hover:bg-surface/30 transition-colors cursor-pointer group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-text">{employee.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-textMuted">{employee.department}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[employee.status]}`}>
                      {statusLabels[employee.status]}
                    </span>
                  </td>
                  <td className="p-4 text-text">{employee.currentTask}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text">{employee.productivityPct}%</span>
                      {employee.productivityPct >= 80 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-textMuted">{employee.meetingStatus}</td>
                  <td className="p-4">
                    <span className={`text-sm ${
                      employee.attendance === 'Present' ? 'text-success' :
                      employee.attendance === 'Late' ? 'text-warning' :
                      'text-textMuted'
                    }`}>
                      {employee.attendance}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-text">{employee.performance}</span>
                      <span className="text-textMuted text-sm">/5.0</span>
                    </div>
                  </td>
                  <td className="p-4 text-textMuted text-sm max-w-[200px] truncate">{employee.aiSummary}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-textMuted">
                      <Calendar className="w-4 h-4" />
                      <span>{employee.meetingHistory}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-surface/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5 text-textMuted" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-textMuted">
            No employees match your filters
          </div>
        )}
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6"
      >
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-text">{employees.length}</div>
          <div className="text-sm text-textMuted">Total Employees</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-success">
            {employees.filter(e => e.status === 'online' || e.status === 'working').length}
          </div>
          <div className="text-sm text-textMuted">Active Now</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-warning">
            {employees.filter(e => e.status === 'in_meeting').length}
          </div>
          <div className="text-sm text-textMuted">In Meetings</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-primary">
            {Math.round(employees.reduce((acc, e) => acc + e.productivityPct, 0) / employees.length)}%
          </div>
          <div className="text-sm text-textMuted">Avg Productivity</div>
        </div>
      </motion.div>
    </div>
  );
}

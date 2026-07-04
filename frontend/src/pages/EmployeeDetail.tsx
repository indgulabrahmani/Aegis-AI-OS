import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, TrendingUp, CheckCircle, AlertCircle, Plus, FileText, Video, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  status: 'completed' | 'pending' | 'in_progress';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface Meeting {
  id: number;
  title: string;
  time: string;
  status: 'upcoming' | 'completed';
}

interface Notification {
  id: number;
  type: 'task_assigned' | 'meeting_reminder' | 'deadline_alert' | 'approval_received' | 'message_from_founder';
  message: string;
  time: string;
  read: boolean;
}

interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data
const mockTasks: Task[] = [
  { id: 1, title: 'Complete API documentation', status: 'completed', priority: 'high', dueDate: '2024-01-15' },
  { id: 2, title: 'Review pull requests', status: 'in_progress', priority: 'medium', dueDate: '2024-01-16' },
  { id: 3, title: 'Update dashboard components', status: 'pending', priority: 'high', dueDate: '2024-01-18' },
  { id: 4, title: 'Fix authentication bug', status: 'pending', priority: 'high', dueDate: '2024-01-17' },
  { id: 5, title: 'Optimize database queries', status: 'completed', priority: 'medium', dueDate: '2024-01-14' }
];

const mockMeetings: Meeting[] = [
  { id: 1, title: 'Team Standup', time: '09:00 AM', status: 'completed' },
  { id: 2, title: 'Product Review', time: '02:00 PM', status: 'upcoming' },
  { id: 3, title: 'Sprint Planning', time: '10:00 AM', status: 'upcoming' }
];

const mockNotifications: Notification[] = [
  { id: 1, type: 'task_assigned', message: 'New task assigned: Complete API documentation', time: '2 hours ago', read: false },
  { id: 2, type: 'meeting_reminder', message: 'Meeting starting in 30 minutes: Product Review', time: '30 min ago', read: false },
  { id: 3, type: 'approval_received', message: 'Your leave request has been approved', time: '1 day ago', read: true },
  { id: 4, type: 'message_from_founder', message: 'Great work on the dashboard!', time: '2 days ago', read: true }
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 1, startDate: '2024-01-20', endDate: '2024-01-22', reason: 'Personal', status: 'approved' }
];

export function EmployeeDetail() {
  const navigate = useNavigate();
  const [tasks] = useState<Task[]>(mockTasks);
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [leaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [onBreak, setOnBreak] = useState(false);
  const [workingHours] = useState('4:32');

  const taskStatusColors = {
    completed: 'bg-success/20 text-success',
    pending: 'bg-warning/20 text-warning',
    in_progress: 'bg-primary/20 text-primary'
  };

  const notificationIcons = {
    task_assigned: CheckCircle,
    meeting_reminder: Clock,
    deadline_alert: AlertCircle,
    approval_received: CheckCircle,
    message_from_founder: Bell
  };

  const notificationColors = {
    task_assigned: 'text-primary',
    meeting_reminder: 'text-warning',
    deadline_alert: 'text-error',
    approval_received: 'text-success',
    message_from_founder: 'text-accent'
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-textMuted hover:text-text mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Sarah Chen</h1>
            <p className="text-textMuted">Engineering Team • Senior Developer</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-2">
              <span className="text-sm text-textMuted">Status:</span>
              <span className="ml-2 text-success font-medium">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attendance Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-text mb-4">Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="text-sm text-textMuted">Check In</div>
              <div className="text-lg font-semibold text-text">09:03 AM</div>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="text-sm text-textMuted">Working Hours</div>
              <div className="text-lg font-semibold text-text">{workingHours}</div>
            </div>
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="text-sm text-textMuted">Break Status</div>
              <div className={`text-lg font-semibold ${onBreak ? 'text-warning' : 'text-success'}`}>
                {onBreak ? 'On Break' : 'Working'}
              </div>
            </div>
            <button
              onClick={() => setOnBreak(!onBreak)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                onBreak ? 'bg-success text-white' : 'bg-warning text-white'
              }`}
            >
              {onBreak ? 'End Break' : 'Start Break'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tasks Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Today's Tasks</h2>
          <button className="flex items-center gap-2 text-primary hover:text-primaryHover transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="glass rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-success' :
                  task.status === 'in_progress' ? 'bg-primary' :
                  'bg-warning'
                }`} />
                <div>
                  <div className="font-medium text-text">{task.title}</div>
                  <div className="text-sm text-textMuted">Due: {task.dueDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${taskStatusColors[task.status]}`}>
                  {task.status.replace('_', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-error/20 text-error' :
                  task.priority === 'medium' ? 'bg-warning/20 text-warning' :
                  'bg-success/20 text-success'
                }`}>
                  {task.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Meetings Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Meetings</h2>
          <button className="flex items-center gap-2 text-primary hover:text-primaryHover transition-colors">
            <Plus className="w-5 h-5" />
            <span>Schedule</span>
          </button>
        </div>
        <div className="space-y-3">
          {meetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="glass rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-text">{meeting.title}</div>
                  <div className="text-sm text-textMuted">{meeting.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  meeting.status === 'completed' ? 'bg-success/20 text-success' :
                  'bg-primary/20 text-primary'
                }`}>
                  {meeting.status}
                </span>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryHover transition-colors">
                  {meeting.status === 'upcoming' ? 'Join' : 'View'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-text mb-4">Notifications</h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => {
            const Icon = notificationIcons[notification.type];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`glass rounded-xl p-4 flex items-start gap-4 ${!notification.read ? 'border-l-4 border-primary' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center ${notificationColors[notification.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text">{notification.message}</div>
                  <div className="text-sm text-textMuted">{notification.time}</div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Leave Requests Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Leave Requests</h2>
          <button className="flex items-center gap-2 text-primary hover:text-primaryHover transition-colors">
            <Plus className="w-5 h-5" />
            <span>Request Leave</span>
          </button>
        </div>
        <div className="space-y-3">
          {leaveRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="glass rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-text">{request.reason}</div>
                  <div className="text-sm text-textMuted">{request.startDate} - {request.endDate}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'approved' ? 'bg-success/20 text-success' :
                request.status === 'rejected' ? 'bg-error/20 text-error' :
                'bg-warning/20 text-warning'
              }`}>
                {request.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-strong rounded-2xl p-6 border border-primary/30 glow-primary"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text">AI-Generated Summary</h2>
        </div>
        <div className="space-y-4">
          <p className="text-text">
            Sarah is performing exceptionally well this week. She has completed 4 out of 5 assigned tasks ahead of schedule.
            Her productivity score of 92% is among the highest in the engineering team.
          </p>
          <div className="glass rounded-xl p-4">
            <div className="text-sm text-textMuted mb-2">Suggestions</div>
            <ul className="space-y-2 text-text">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Consider pairing Sarah with Michael on the authentication bug - her expertise could help resolve it faster.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Sarah is ready for mentorship responsibilities - consider assigning her a junior developer.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

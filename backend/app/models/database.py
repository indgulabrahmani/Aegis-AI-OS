from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Enum as SQLEnum, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()


class UserRole(enum.Enum):
    FOUNDER = "founder"
    EMPLOYEE = "employee"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.FOUNDER, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    missions = relationship("Mission", back_populates="founder")
    employee_profile = relationship("Employee", back_populates="user", uselist=False)


class MissionStatus(enum.Enum):
    PLANNING = "planning"
    RUNNING = "running"
    AWAITING_APPROVAL = "awaiting_approval"
    COMPLETED = "completed"


class TaskStatus(enum.Enum):
    QUEUED = "queued"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class ApprovalStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class AgentType(enum.Enum):
    HR = "hr"
    FINANCE = "finance"
    LEGAL = "legal"
    MARKETING = "marketing"


class ActorType(enum.Enum):
    ORCHESTRATOR = "orchestrator"
    HR = "hr"
    FINANCE = "finance"
    LEGAL = "legal"
    MARKETING = "marketing"
    FOUNDER = "founder"


class Mission(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    founder_goal = Column(Text, nullable=False)
    status = Column(SQLEnum(MissionStatus), default=MissionStatus.PLANNING)
    created_at = Column(DateTime, default=datetime.utcnow)
    founder_id = Column(Integer, ForeignKey("users.id"))

    founder = relationship("User", back_populates="missions")
    tasks = relationship("Task", back_populates="mission", cascade="all, delete-orphan")
    logs = relationship("Log", back_populates="mission", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=False)
    agent = Column(SQLEnum(AgentType), nullable=False)
    description = Column(Text, nullable=False)
    output = Column(Text, nullable=True)
    artifact_type = Column(String, nullable=True)
    requires_approval = Column(Boolean, default=False)
    approval_status = Column(SQLEnum(ApprovalStatus), nullable=True)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.QUEUED)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    mission = relationship("Mission", back_populates="tasks")
    approvals = relationship("Approval", back_populates="task", cascade="all, delete-orphan")
    logs = relationship("Log", back_populates="task", cascade="all, delete-orphan")


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False)
    approved = Column(Boolean, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("Task", back_populates="approvals")


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    actor = Column(SQLEnum(ActorType), nullable=False)
    action = Column(String, nullable=False)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    details = Column(Text, nullable=False)

    mission = relationship("Mission", back_populates="logs")
    task = relationship("Task", back_populates="logs")


class EmployeeStatus(enum.Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    IN_MEETING = "in_meeting"
    WORKING = "working"
    ON_LEAVE = "on_leave"


class LeaveRequestStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class NotificationType(enum.Enum):
    TASK_ASSIGNED = "task_assigned"
    MEETING_REMINDER = "meeting_reminder"
    DEADLINE_ALERT = "deadline_alert"
    APPROVAL_RECEIVED = "approval_received"
    MESSAGE_FROM_FOUNDER = "message_from_founder"


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    status = Column(SQLEnum(EmployeeStatus), default=EmployeeStatus.OFFLINE)
    current_task = Column(Text, nullable=True)
    productivity_pct = Column(Float, default=0.0)
    performance_score = Column(Float, default=0.0)
    check_in_time = Column(DateTime, nullable=True)
    check_out_time = Column(DateTime, nullable=True)
    on_break = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="employee_profile")
    daily_reports = relationship("DailyReport", back_populates="employee", cascade="all, delete-orphan")
    leave_requests = relationship("LeaveRequest", back_populates="employee", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="employee", cascade="all, delete-orphan")


class DailyReport(Base):
    __tablename__ = "daily_reports"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    tasks_completed = Column(Text, nullable=True)
    tasks_pending = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="daily_reports")


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(SQLEnum(LeaveRequestStatus), default=LeaveRequestStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="leave_requests")


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    participants = Column(Text, nullable=True)  # JSON string of participant IDs
    scheduled_at = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled")
    notes_url = Column(String, nullable=True)
    recording_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    type = Column(SQLEnum(NotificationType), nullable=False)
    message = Column(Text, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="notifications")


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    total_missions = Column(Integer, default=0)
    completed_missions = Column(Integer, default=0)
    total_tasks = Column(Integer, default=0)
    hr_tasks = Column(Integer, default=0)
    finance_tasks = Column(Integer, default=0)
    legal_tasks = Column(Integer, default=0)
    marketing_tasks = Column(Integer, default=0)
    approvals_granted = Column(Integer, default=0)
    approvals_denied = Column(Integer, default=0)
    avg_completion_time = Column(Float, default=0.0)

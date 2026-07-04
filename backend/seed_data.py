import asyncio
from app.core.database import engine, AsyncSessionLocal
from app.models.database import User, UserRole, Employee, EmployeeStatus, DailyReport, LeaveRequest, Meeting, Notification, NotificationType
from app.core.security import get_password_hash
from datetime import datetime, timedelta
import random

async def seed_data():
    """
    Seed the database with mock data for testing
    """
    async with AsyncSessionLocal() as session:
        # Create founder user
        founder = User(
            email="founder@aegis.ai",
            full_name="Alex Founder",
            hashed_password=get_password_hash("founder123"),
            role=UserRole.FOUNDER,
            is_active=True
        )
        session.add(founder)
        await session.commit()
        await session.refresh(founder)
        print(f"Created founder: {founder.email}")

        # Create employee users
        employee_data = [
            {"name": "Sarah Chen", "department": "Engineering", "status": EmployeeStatus.ONLINE},
            {"name": "James Wilson", "department": "Design", "status": EmployeeStatus.IN_MEETING},
            {"name": "Emily Rodriguez", "department": "Marketing", "status": EmployeeStatus.WORKING},
            {"name": "Michael Brown", "department": "Engineering", "status": EmployeeStatus.OFFLINE},
            {"name": "Lisa Park", "department": "HR", "status": EmployeeStatus.ON_LEAVE},
            {"name": "David Kim", "department": "Finance", "status": EmployeeStatus.ONLINE},
        ]

        employees = []
        for emp_data in employee_data:
            # Create user
            email = f"{emp_data['name'].lower().replace(' ', '.')}@aegis.ai"
            user = User(
                email=email,
                full_name=emp_data['name'],
                hashed_password=get_password_hash("employee123"),
                role=UserRole.EMPLOYEE,
                is_active=True
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)

            # Create employee profile
            employee = Employee(
                user_id=user.id,
                name=emp_data['name'],
                department=emp_data['department'],
                status=emp_data['status'],
                current_task="Working on current project",
                productivity_pct=random.randint(65, 95),
                performance_score=round(random.uniform(3.5, 5.0), 1),
                check_in_time=datetime.utcnow().replace(hour=9, minute=0, second=0, microsecond=0) if emp_data['status'] != EmployeeStatus.ON_LEAVE else None,
                on_break=False
            )
            session.add(employee)
            await session.commit()
            await session.refresh(employee)
            employees.append(employee)
            print(f"Created employee: {employee.name} ({employee.department})")

        # Create daily reports for employees
        for employee in employees:
            if employee.status != EmployeeStatus.ON_LEAVE:
                report = DailyReport(
                    employee_id=employee.id,
                    date=datetime.utcnow(),
                    tasks_completed="Completed API documentation, code reviews",
                    tasks_pending="Update dashboard components, fix authentication bug",
                    notes="Productive day, no blockers",
                    ai_summary=f"{employee.name} is performing well with {employee.productivity_pct}% productivity."
                )
                session.add(report)
                await session.commit()
                print(f"Created daily report for {employee.name}")

        # Create leave requests
        leave_requests = [
            {"employee_id": employees[4].id, "start": datetime.utcnow() + timedelta(days=7), "end": datetime.utcnow() + timedelta(days=9), "reason": "Personal vacation"},
            {"employee_id": employees[2].id, "start": datetime.utcnow() + timedelta(days=14), "end": datetime.utcnow() + timedelta(days=15), "reason": "Medical appointment"},
        ]

        for lr_data in leave_requests:
            leave_request = LeaveRequest(
                employee_id=lr_data["employee_id"],
                start_date=lr_data["start"],
                end_date=lr_data["end"],
                reason=lr_data["reason"]
            )
            session.add(leave_request)
            await session.commit()
            print(f"Created leave request")

        # Create meetings
        meetings = [
            {"title": "Team Standup", "scheduled_at": datetime.utcnow().replace(hour=9, minute=0), "participants": [e.id for e in employees[:3]]},
            {"title": "Product Review", "scheduled_at": datetime.utcnow().replace(hour=14, minute=0), "participants": [e.id for e in employees[:4]]},
            {"title": "Sprint Planning", "scheduled_at": datetime.utcnow() + timedelta(days=1), "participants": [e.id for e in employees[:5]]},
        ]

        for meeting_data in meetings:
            meeting = Meeting(
                title=meeting_data["title"],
                participants=str(meeting_data["participants"]),
                scheduled_at=meeting_data["scheduled_at"],
                status="scheduled"
            )
            session.add(meeting)
            await session.commit()
            print(f"Created meeting: {meeting.title}")

        # Create notifications for employees
        notification_types = [
            NotificationType.TASK_ASSIGNED,
            NotificationType.MEETING_REMINDER,
            NotificationType.APPROVAL_RECEIVED,
            NotificationType.MESSAGE_FROM_FOUNDER
        ]

        for employee in employees[:4]:
            for notif_type in notification_types:
                messages = {
                    NotificationType.TASK_ASSIGNED: "New task assigned: Complete API documentation",
                    NotificationType.MEETING_REMINDER: "Meeting starting in 30 minutes",
                    NotificationType.APPROVAL_RECEIVED: "Your request has been approved",
                    NotificationType.MESSAGE_FROM_FOUNDER: "Great work on the recent project!"
                }
                notification = Notification(
                    employee_id=employee.id,
                    type=notif_type,
                    message=messages[notif_type],
                    read=random.choice([True, False])
                )
                session.add(notification)
                await session.commit()
            print(f"Created notifications for {employee.name}")

        print("\n✅ Database seeded successfully!")
        print(f"📊 Summary:")
        print(f"   - 1 Founder user")
        print(f"   - {len(employees)} Employee users")
        print(f"   - {len(employees)} Employee profiles")
        print(f"   - {len(employees) - 1} Daily reports")
        print(f"   - {len(leave_requests)} Leave requests")
        print(f"   - {len(meetings)} Meetings")
        print(f"   - {(len(employees[:4]) * len(notification_types))} Notifications")


if __name__ == "__main__":
    asyncio.run(seed_data())

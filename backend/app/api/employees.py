from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.deps import get_current_founder
from app.models.database import User, Employee, EmployeeStatus
from typing import List
from datetime import datetime
import json

router = APIRouter(prefix="/api/employees", tags=["Employees"])


@router.get("/")
async def get_employees(
    current_user: User = Depends(get_current_founder),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all employees (founder only)
    """
    result = await db.execute(select(Employee))
    employees = result.scalars().all()
    
    employee_data = []
    for employee in employees:
        employee_data.append({
            "id": employee.id,
            "name": employee.name,
            "department": employee.department,
            "status": employee.status.value,
            "current_task": employee.current_task,
            "productivity_pct": employee.productivity_pct,
            "performance_score": employee.performance_score,
            "check_in_time": employee.check_in_time.isoformat() if employee.check_in_time else None,
            "check_out_time": employee.check_out_time.isoformat() if employee.check_out_time else None,
            "on_break": employee.on_break,
            "created_at": employee.created_at.isoformat()
        })
    
    return employee_data


@router.get("/{employee_id}")
async def get_employee(
    employee_id: int,
    current_user: User = Depends(get_current_founder),
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific employee (founder only)
    """
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalar_one_or_none()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    return {
        "id": employee.id,
        "name": employee.name,
        "department": employee.department,
        "status": employee.status.value,
        "current_task": employee.current_task,
        "productivity_pct": employee.productivity_pct,
        "performance_score": employee.performance_score,
        "check_in_time": employee.check_in_time.isoformat() if employee.check_in_time else None,
        "check_out_time": employee.check_out_time.isoformat() if employee.check_out_time else None,
        "on_break": employee.on_break,
        "created_at": employee.created_at.isoformat()
    }


@router.post("/check-in")
async def check_in(
    employee_id: int,
    current_user: User = Depends(get_current_founder),
    db: AsyncSession = Depends(get_db)
):
    """
    Check in an employee (founder only)
    """
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalar_one_or_none()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    employee.check_in_time = datetime.utcnow()
    employee.status = EmployeeStatus.WORKING
    employee.on_break = False
    
    await db.commit()
    await db.refresh(employee)
    
    return {"message": "Check-in successful", "check_in_time": employee.check_in_time.isoformat()}


@router.post("/check-out")
async def check_out(
    employee_id: int,
    current_user: User = Depends(get_current_founder),
    db: AsyncSession = Depends(get_db)
):
    """
    Check out an employee (founder only)
    """
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalar_one_or_none()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    employee.check_out_time = datetime.utcnow()
    employee.status = EmployeeStatus.OFFLINE
    employee.on_break = False
    
    await db.commit()
    await db.refresh(employee)
    
    return {"message": "Check-out successful", "check_out_time": employee.check_out_time.isoformat()}


@router.post("/break")
async def toggle_break(
    employee_id: int,
    current_user: User = Depends(get_current_founder),
    db: AsyncSession = Depends(get_db)
):
    """
    Toggle break status for an employee (founder only)
    """
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalar_one_or_none()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    employee.on_break = not employee.on_break
    employee.status = EmployeeStatus.WORKING if not employee.on_break else EmployeeStatus.OFFLINE
    
    await db.commit()
    await db.refresh(employee)
    
    return {"message": "Break status updated", "on_break": employee.on_break}

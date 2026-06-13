from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas

from dependencies import get_db

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/", response_model=schemas.OrderResponse)
def create_order(
        order: schemas.OrderCreate,
        db: Session = Depends(get_db)
):
    return crud.create_order(db, order)


@router.get("/", response_model=list[schemas.OrderResponse])
def get_orders(
        db: Session = Depends(get_db)
):
    return crud.get_orders(db)
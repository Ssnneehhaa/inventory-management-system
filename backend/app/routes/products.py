from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

import crud
import schemas

from dependencies import get_db

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/", response_model=schemas.ProductResponse)
def create_product(
        product: schemas.ProductCreate,
        db: Session = Depends(get_db)
):

    return crud.create_product(db, product)


@router.get("/", response_model=list[schemas.ProductResponse])
def get_products(
        db: Session = Depends(get_db)
):

    return crud.get_products(db)

@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db)
):
    return crud.update_product(
        db,
        product_id,
        product
    )


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_product(
        db,
        product_id
    )
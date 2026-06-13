from pydantic import BaseModel


# Product Schemas
class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    stock: int


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True


# Customer Schemas
class CustomerCreate(BaseModel):
    name: str
    email: str


class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int


class OrderResponse(OrderCreate):
    id: int

    class Config:
        from_attributes = True


class ProductUpdate(BaseModel):
    name: str
    sku: str
    price: float
    stock: int


class CustomerUpdate(BaseModel):
    name: str
    email: str

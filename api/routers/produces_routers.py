from fastapi import APIRouter, Depends, Response,  HTTPException
from queries.produces_queries import ItemIn, ItemRepository, ItemOut, Error
from typing import Union, Optional, List
from authenticator import authenticator
router = APIRouter()

router = APIRouter(tags=["Produces"], prefix="/api/produces")

def get_item_repository():
    return ItemRepository()

@router.post("/produces", response_model=Union[ItemOut, Error])
def add_produce(item: ItemIn, response: Response, account_data: dict = Depends(authenticator.get_current_account_data), repo: ItemRepository = Depends(get_item_repository)):
    itemss = repo.add_produces(item, account_id=account_data['id'])
    if itemss is None:
        response.status_code = 400
    return itemss

@router.get("/produces/mine", response_model=Union[List[ItemOut], Error])
def get_all_for_account(account_data: dict = Depends(authenticator.get_current_account_data), repo: ItemRepository=Depends()):
    return repo.get_all_for_account(account_id=account_data['id'])

@router.put("/produces/{item_id}", response_model=Union[ItemOut, Error])
def update_produce(item_id: str, item: ItemIn, account_data: dict = Depends(authenticator.get_current_account_data), repo: ItemRepository = Depends()) -> Union[Error, ItemOut]:
    produce = repo.update_produces(item_id, account_data['id'], item)
    if produce is None:
        raise HTTPException(status_code = 404, detail="produce not found")
    return produce

@router.delete("/produces/{item_id}", response_model=bool)
def delete_produce(item_id: str, account_data: dict = Depends(authenticator.get_current_account_data), repo: ItemRepository = Depends()) -> bool:
    return repo.delete_produces(item_id=item_id, account_id=account_data['id'])

@router.get("/produces/{item_id}", response_model=Optional[ItemOut])
def get_produce(item_id: str, response: Response, account_data: dict = Depends(authenticator.get_current_account_data),
repo: ItemRepository = Depends()) -> ItemOut:
    item = repo.get_produces(item_id, account_id=account_data['id'])
    if item is None:
        response.status_code = 404
    return item

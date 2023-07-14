import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useEffect } from "react";

export default function InventoryUpdateForm({ oldInventory, handleInventoryUpdate }) {

  const url = 'http://localhost:8080/inventory';

  useEffect(() => {
    handleInventoryUpdate(oldInventory);
  }, [oldInventory]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const editedInventory = {
        inventoryId : {
            itemId : oldInventory.warehouse.id,
            warehouseId : oldInventory.item.id,
        },
        warehouse : {
            id : oldInventory.warehouse.id,
            name: oldInventory.warehouse.name,
            location: oldInventory.warehouse.location,
            maximumCapacity: oldInventory.warehouse.maximumCapacity,
        },
        item : {
            id : oldInventory.item.id,
            name: oldInventory.item.name,
        },
        quantity : data.get('quantity')
    };

    fetch(url + '/' + oldInventory.warehouse.id + '/' + oldInventory.item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedInventory),
    })
      .then(response => {
          if (!response.ok) {
              return Promise.reject(new Error('DATA VALIDATION: invalid data sent to server'));
          }
          return response.json();
      })
      .then(returnedData => {
          handleInventoryUpdate(returnedData); // Call the prop to update the state in the parent component
          event.target.reset();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="item-name-input">Item Name</Label>
        <TextInput
          id="item-name-input"
          name="itemName"
          type="text"
          defaultValue={oldInventory.item.name}
          readOnly // Make the field read-only
          className="bg-disabled" // Apply the gray color class
        />

        <Label htmlFor="quantity-input">Item Quantity</Label>
        <TextInput
          id="quantity-input"
          name="quantity"
          type="text"
          defaultValue={oldInventory.quantity}
        />

        <Label htmlFor="warehouse-name-input">Warehouse Name</Label>
        <TextInput
          id="warehouse-name-input"
          name="warehouseName"
          type="text"
          defaultValue={oldInventory.warehouse.name}
          readOnly // Make the field read-only
          className="bg-disabled" // Apply the gray color class
        />
        
        <Button type="submit" data-close-modal="true">
          Submit
        </Button>
      </Form>
    </>
  );
}
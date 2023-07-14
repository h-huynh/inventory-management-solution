import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useEffect } from "react";

export default function WarehousesUpdateForm({ oldWarehouse, handleWarehouseUpdate }) {

  const url = 'http://localhost:8080/warehouses';

  // to apply changes on warehouse update
  useEffect(() => {
    handleWarehouseUpdate(oldWarehouse);
  }, [oldWarehouse]);


  //on form submit
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const editedWarehouse = {
      id: oldWarehouse.id,
      name: data.get('warehouseName'),
      location: data.get('warehouseLocation'),
      maximumCapacity: oldWarehouse.maximumCapacity, //currently does not allow for capacity expansions 
    };

    fetch(url + '/warehouse/' + oldWarehouse.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedWarehouse),
    })
      .then(response => response.json())
      .then(returnedData => {
        handleWarehouseUpdate(returnedData); // Call the prop to update the state in the parent component
        event.target.reset();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="warehouse-id-input">Warehouse ID</Label>
        <TextInput
          id="warehouse-id-input"
          name="warehouseId"
          type="text"
          defaultValue={oldWarehouse.id}
          readOnly // Make the field read-only
          className="bg-disabled" // Apply the gray color class
        />

        <Label htmlFor="warehouse-name-input">Warehouse Name</Label>
        <TextInput
          id="warehouse-name-input"
          name="warehouseName"
          type="text"
          defaultValue={oldWarehouse.name}
        />

        <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
        <TextInput
          id="warehouse-location-input"
          name="warehouseLocation"
          type="text"
          defaultValue={oldWarehouse.location}
        />

        <Label htmlFor="warehouse-capacity-input">Warehouse Maximum Capacity</Label>
        <TextInput
          id="warehouse-capacity-input"
          name="maximumCapacity"
          type="number"
          defaultValue={oldWarehouse.maximumCapacity}
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
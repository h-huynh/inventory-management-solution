import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function WarehousesForm({ handleNewWarehouse, setErrorMessage}) {
  const url = 'http://localhost:8080/warehouses';

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    const newWarehouse = {
      name: data.get('warehouseName'),
      location: data.get('warehouseLocation'),
      maximumCapacity: data.get('warehouseCapacity'),
    };

    fetch(url + '/warehouse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWarehouse),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating warehouse.');
        }
        return response.json();
      })
      .then(returnedData => {
        handleNewWarehouse(returnedData);
        event.target.reset();
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Error adding warehouse. Capacity must be a minimum of 10.');
      });

      event.target.reset();
      // Automatically clear the error message after a second
      setTimeout(() => {
        setErrorMessage('');
      }, 6000);
  
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="warehouse-name-input">Warehouse Name</Label>
        <TextInput id="warehouse-name-input" name="warehouseName" type="text" />

        <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
        <TextInput id="warehouse-location-input" name="warehouseLocation" type="text" />

        <Label htmlFor="warehouse-capacity-input">Warehouse Maximum Capacity</Label>
        <TextInput id="warehouse-capacity-input" name="warehouseCapacity" type="text" />

        <Button type="submit" data-close-modal="true">
          Submit
        </Button>
      </Form>
    </>
  );
}
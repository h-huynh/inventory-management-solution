import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useEffect } from "react";

export default function ItemsUpdateForm({ oldItem, handleItemUpdate }) {

  const url = 'http://localhost:8080/items';

  useEffect(() => {
    handleItemUpdate(oldItem);
  }, [oldItem]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const editedItem = {
      id: oldItem.id,
      name: data.get('itemName'),
    };

    fetch(url + '/item/' + oldItem.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedItem),
    })
      .then(response => response.json())
      .then(returnedData => {
        handleItemUpdate(returnedData); // Call the prop to update the state in the parent component
        event.target.reset();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="item-id-input">Item ID</Label>
        <TextInput
          id="item-id-input"
          name="itemId"
          type="text"
          defaultValue={oldItem.id}
          readOnly // Make the field read-only
        />

        <Label htmlFor="item-name-input">Item Name</Label>
        <TextInput
          id="item-name-input"
          name="itemName"
          type="text"
          defaultValue={oldItem.name}
        />

        <Button type="submit" data-close-modal="true">
          Submit
        </Button>
      </Form>
    </>
  );
}
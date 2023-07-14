import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
import { useEffect } from "react";

export default function ItemsUpdateForm({ oldItem, handleItemUpdate }) {

  const url = 'http://localhost:8080/items';

  //for handling changes to the item
  useEffect(() => {
    handleItemUpdate(oldItem);
  }, [oldItem]);

  //on form submit
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    // create edited item object
    const editedItem = {
      id: oldItem.id,
      name: data.get('itemName'),
    };

    //put to the server
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
          className="bg-disabled" // Apply the gray color class
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
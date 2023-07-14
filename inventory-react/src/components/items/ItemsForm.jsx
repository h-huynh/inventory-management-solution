import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function ItemsForm({ handleNewItem }) {
  const url = 'http://localhost:8080/items';


  //handles submit of the form
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    const newItem = {
      name: data.get('itemName'),
    };

    //post to the server
    fetch(url + '/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(data => data.json())
      .then(returnedData => {
        handleNewItem(returnedData); //handle the state change of new item
        event.target.reset();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="item-name-input">Item Name</Label>
        <TextInput id="item-name-input" name="itemName" type="text" />
        <Button type="submit" data-close-modal="true">
          Submit
        </Button>
      </Form>
    </>
  );
}
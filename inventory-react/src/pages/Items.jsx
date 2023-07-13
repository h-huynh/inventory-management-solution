import { GridContainer, Grid, Modal, ModalHeading, ModalToggleButton } from '@trussworks/react-uswds';
import ItemsTable from '../components/items/ItemsTable';
import ItemsForm from '../components/items/ItemsForm';
import { useRef, useState, useEffect } from 'react';

export default function Items() {
  const url = 'http://localhost:8080/items';

  const [items, setItems] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch(url)
      .then(data => data.json())
      .then(returnedData => {
        setItems(returnedData);
      })
      .catch(error => console.error(error));
  }, []);

  function handleNewItem(newItem) {
    setItems(oldState => {
      return [...oldState, newItem];
    });
  }

  function handleEdit(id) {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems.find(item => item.id === id);
    if (!itemToUpdate) {
      console.error(`Item with ID ${id} not found.`);
      return;
    }
  
    // Prompt the user for the updated item details
    const updatedName = prompt('Enter the updated name:', itemToUpdate.name);
    if (updatedName === null) {
      return; // User canceled the update
    }
  
    // Update the item locally
    itemToUpdate.name = updatedName;
    setItems(updatedItems);
  
    // Send the PUT request to the server
    fetch(url + '/item/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemToUpdate),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating item.');
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error state or display error message to the user
      });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) {
      return; // User canceled the delete action
    }
  
    // Remove the item locally
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  
    // Send the DELETE request to the server
    fetch(url + '/item/' + id, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting item.');
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error state or display error message to the user
      });
  }

  return (
    <>
      <GridContainer>
        <Grid row>
          <Grid col={10}>
            <h1 className="text-centered">All Items</h1>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col={2}>
            <ModalToggleButton modalRef={modalRef} opener>
              New Item
            </ModalToggleButton>
          </Grid>
        </Grid> 
        <Grid row>
          <Grid col>
            <ItemsTable
              tableData={items}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="item-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Item Details</ModalHeading>
        <ItemsForm handleNewItem={handleNewItem} />
      </Modal>
    </>
  );
}
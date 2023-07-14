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
        const sortedItems = returnedData.sort((a, b) => a.id - b.id); // sort by item ids smallest -> largest
        setItems(sortedItems);
      })
      .catch(error => console.error(error));
  }, []);

  function handleNewItem(newItem) {
    setItems(oldState => {
      return [...oldState, newItem];
    });
  }

  //maintains the position of the item in the array
  function handleItemUpdate(updatedItem) {
    setItems(oldItems => {
      // Find the index of the updated item in the items array
      const updatedIndex = oldItems.findIndex(item => item.id === updatedItem.id);
  
      // If the item is found, replace it with the updated item in a new array
      if (updatedIndex !== -1) {
        const updatedItems = [...oldItems];
        updatedItems[updatedIndex] = updatedItem;
        return updatedItems;
      }
  
      return oldItems;
    });
  }

  //handles item deletions by inputting an item id
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
            <h1 className="text-centered">ITEMS CATALOG</h1>
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
              handleDelete={handleDelete}
              handleItemUpdate={handleItemUpdate}
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
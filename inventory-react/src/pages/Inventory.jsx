import { GridContainer, Grid, Modal, ModalHeading, ModalToggleButton, ErrorMessage } from '@trussworks/react-uswds';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryForm from '../components/inventory/InventoryForm';
import { useRef, useState, useEffect } from 'react';

export default function Inventory() {
  const url = 'http://localhost:8080/inventory';

  const [inventory, setInventory] = useState([]);
  const modalRef = useRef(null);

  // this state sets the error message and displays it when changed
  const [errorMessage, setErrorMessage] = useState('');

  //retrieve data
  useEffect(() => {
    fetch(url)
      .then(data => data.json())
      .then(returnedData => {
        const sortedInventory = returnedData.sort((a, b) => a.item.id - b.item.id); //sort by item id
        setInventory(sortedInventory);
      })
      .catch(error => console.error(error));
  }, []);

  //update the state of the inventory
  function handleNewInventory(newInventory) {
    setInventory(oldInventory => {
      const updatedInventory = [...oldInventory, newInventory];
      return sortInventory(updatedInventory);
    });
  }

  //sorts the inventory data by item id. --> if need to, can be swapped to something like warehouse id
  function sortInventory(inventoryData) {
    const sortedInventory = inventoryData.sort((a, b) => a.item.id - b.item.id);
    return sortedInventory;
  }

  //changes the state on inventory update
  function handleInventoryUpdate(updatedInventory) {
    setInventory(oldInventory => {
      // Find the index of the updated inventory in the inventory array
      const updatedIndex = oldInventory.findIndex(inventory =>
        inventory.warehouse.id === updatedInventory.warehouse.id &&
        inventory.item.id === updatedInventory.item.id
      );
  
      // If the inventory is found, replace it with the updated inventory in a new array
      if (updatedIndex !== -1) {
        const updatedInventoryList = [...oldInventory];
        updatedInventoryList[updatedIndex] = updatedInventory;
        return updatedInventoryList;
      }
  
      return oldInventory;
    });
  }

  // handles inventory deletes - passed as a prop to the delete button element in each row
  function handleDelete(warehouseId, itemId) {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (!confirmDelete) {
      return; // User canceled the delete action
    }
  
    // Send the DELETE request to the server
    fetch(url + '/' + warehouseId + '/' + itemId, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting inventory.');
        }
         // Update the state to remove the deleted inventory item
        setInventory(oldState => 
            oldState.filter(inventory => 
                inventory.warehouse.id !== warehouseId || inventory.item.id !== itemId));
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
            <h1 className="text-centered">INVENTORY</h1>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col={2}>
            <ModalToggleButton modalRef={modalRef} opener>
              New Inventory
            </ModalToggleButton>          
          </Grid>
          <Grid col={4}>
            {errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
          </Grid>
        </Grid> 
        <Grid row>
          <Grid col>
            <InventoryTable
              tableData={inventory}
              handleDelete={handleDelete}
              handleInventoryUpdate={handleInventoryUpdate}
              setErrorMessage={setErrorMessage}
            />
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="inventory-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Inventory Details</ModalHeading>
        <InventoryForm 
          handleNewInventory={handleNewInventory}
          setErrorMessage={setErrorMessage}/>
      </Modal>
    </>
  );
}
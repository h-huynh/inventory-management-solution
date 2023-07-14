import { GridContainer, Grid, Modal, ModalHeading, ModalToggleButton, ErrorMessage } from '@trussworks/react-uswds';
import WarehousesTable from '../components/warehouses/WarehousesTable';
import WarehousesForm from '../components/warehouses/WarehousesForm';
import { useRef, useState, useEffect } from 'react';

export default function Warehouses() {
  const url = 'http://localhost:8080/warehouses';

  const [warehouses, setWarehouses] = useState([]);
  const modalRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(url)
      .then(data => data.json())
      .then(returnedData => {
        const sortedWarehouses = returnedData.sort((a, b) => a.id - b.id);
        setWarehouses(sortedWarehouses);
      })
      .catch(error => console.error(error));
  }, []);

  //updates warehouse table
  function handleNewWarehouse(newWarehouse) {
    setWarehouses(oldState => {
      return [...oldState, newWarehouse];
    });
  }

  //on warehouse updates, updates table sorting
  function handleWarehouseUpdate(updatedWarehouse) {
    setWarehouses(oldWarehouses => {
      // Find the index of the updated warehouse in the warehouses array
      const updatedIndex = oldWarehouses.findIndex(warehouse => warehouse.id === updatedWarehouse.id);
  
      // If the warehouse is found, replace it with the updated warehouse in a new array
      if (updatedIndex !== -1) {
        const updatedWarehouses = [...oldWarehouses];
        updatedWarehouses[updatedIndex] = updatedWarehouse;
        return updatedWarehouses;
      }
  
      return oldWarehouses;
    });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this warehouse?');
    if (!confirmDelete) {
      return; // User canceled the delete action
    }
  
    // Remove the warehouse locally
    const updatedWarehouses = warehouses.filter(warehouse => warehouse.id !== id);
    setWarehouses(updatedWarehouses);
  
    // Send the DELETE request to the server
    fetch(url + '/warehouse/' + id, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting warehouse.');
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
            <h1 className="text-centered">WAREHOUSES</h1>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col={2}>
            <ModalToggleButton modalRef={modalRef} opener>
              New Warehouse
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
            <WarehousesTable
              tableData={warehouses}
              handleDelete={handleDelete}
              handleWarehouseUpdate={handleWarehouseUpdate}
            />
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="warehouse-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Warehouse Details</ModalHeading>
        <WarehousesForm 
          handleNewWarehouse={handleNewWarehouse}
          setErrorMessage={setErrorMessage} />
      </Modal>
    </>
  );
}
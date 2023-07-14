import { Table, Button, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { useRef, useState, useEffect } from "react";
import WarehousesUpdateForm from "./WarehousesUpdateForm";

export default function WarehousesTable({ tableData, handleWarehouseUpdate, handleDelete }) {
  const editModalRef = useRef(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [currentStorage, setCurrentStorage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  useEffect(() => {
    const fetchCurrentStorage = async () => {
      setIsLoading(true);

      try {
        const fetchPromises = tableData.map((warehouse) =>
          fetch(`http://localhost:8080/inventory/${warehouse.id}/totalQuantity`).then((response) => response.json())
        );

        const storageData = await Promise.all(fetchPromises);

        const updatedStorage = {};

        storageData.forEach((data, index) => {
          const warehouseId = tableData[index].id;
          updatedStorage[warehouseId] = data;
        });

        setCurrentStorage(updatedStorage);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchCurrentStorage();
  }, [tableData]);

  return (
    <>
      <Table striped fullWidth className="bg-primary-lighter">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Current Storage</th>
            <th>Maximum Capacity</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((warehouse) => {
            const currentStorageValue = currentStorage[warehouse.id];

            return (
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>{isLoading ? 'Loading...' : currentStorageValue}</td>
                <td>{warehouse.maximumCapacity}</td>
                <td>
                  <ModalToggleButton modalRef={editModalRef} opener onClick={() => handleOpenModal(warehouse)}>
                    Edit
                  </ModalToggleButton>
                </td>

                <td>
                  <Button onClick={() => handleDelete(warehouse.id)} className="bg-secondary-darker" type="button">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal id="edit-warehouse-form-modal" ref={editModalRef}>
        <ModalHeading>Edit Warehouse Details</ModalHeading>
        {selectedWarehouse && (
          <div>
            <WarehousesUpdateForm oldWarehouse={selectedWarehouse} handleWarehouseUpdate={handleWarehouseUpdate} />
          </div>
        )}
      </Modal>
    </>
  );
}
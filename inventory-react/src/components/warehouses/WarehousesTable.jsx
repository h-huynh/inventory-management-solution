import { Table, Button, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { useRef, useState } from "react";
import WarehousesUpdateForm from "./WarehousesUpdateForm";

export default function WarehousesTable({tableData,handleWarehouseUpdate,handleDelete}) {
    const editModalRef = useRef(null);
    const [selectedWarehouse, setSelectedWarehouse] =  useState(null);
    
    const handleOpenModal = (warehouse) => {
        setSelectedWarehouse(warehouse);
    };

    return(
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
                        return (
                            <tr key={warehouse.id}>
                                <td>{warehouse.id}</td>
                                <td>{warehouse.name}</td>
                                <td>{warehouse.location}</td>
                                <td>filler</td>
                                <td>{warehouse.maximumCapacity}</td>
                                <td>
                                    <ModalToggleButton modalRef={editModalRef} opener onClick={() => handleOpenModal(warehouse)}>
                                        Edit
                                    </ModalToggleButton>
                                    <Button onClick={() => handleDelete(warehouse.id)} outline type="button">
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
                        <WarehousesUpdateForm oldWarehouse={selectedWarehouse} handleWarehouseUpdate={handleWarehouseUpdate}/>
                    </div> 
                )}
            </Modal>
        </>
    );
}
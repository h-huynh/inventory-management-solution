import { Button, Modal, ModalHeading, ModalToggleButton, Table } from "@trussworks/react-uswds";
import { useRef, useState } from "react";
import InventoryUpdateForm from "./InventoryUpdateForm";

export default function InventoryTable({tableData, handleInventoryUpdate, handleDelete}) {
    const editModalRef = useRef(null);
    const [selectedInventory, setSelectedInventory] = useState(null);

    const handleOpenModal = (inventory) => {
        setSelectedInventory(inventory);
    };

    return(
        <>
            <Table striped fullWidth className="bg-primary-lighter">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Warehouse ID</th>
                        <th>Warehouse Name</th>
                        <th>Warehouse Location</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((inventory) => {
                        return (
                            <tr key={inventory.inventoryId.itemId + ' ' + inventory.inventoryId.warehouseId}>
                                <td>{inventory.item.id}</td>
                                <td>{inventory.item.name}</td>
                                <td>{inventory.quantity}</td>
                                <td>{inventory.warehouse.id}</td>
                                <td>{inventory.warehouse.name}</td>
                                <td>{inventory.warehouse.location}</td>
                                <td>
                                    <ModalToggleButton modalRef={editModalRef} opener onClick={() => handleOpenModal(inventory)}>
                                        Edit
                                    </ModalToggleButton>
                                    <Button onClick={() => handleDelete(inventory.warehouse.id, inventory.item.id)} 
                                    outline type="button">
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Modal id="edit-inventory-form-modal" ref={editModalRef}>
            <ModalHeading>Edit Inventory Details</ModalHeading>
                {selectedInventory && (
                    <div>
                        <InventoryUpdateForm oldInventory={selectedInventory} handleInventoryUpdate={handleInventoryUpdate}/>
                    </div> 
                )}
            </Modal>
        </>
    );
}
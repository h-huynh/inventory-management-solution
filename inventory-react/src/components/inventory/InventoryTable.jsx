import { Button, Table } from "@trussworks/react-uswds";

export default function InventoryTable({tableData, handleEdit, handleDelete}) {
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
        </>
    );
}
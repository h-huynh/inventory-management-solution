import { Table, Button } from "@trussworks/react-uswds";

export default function WarehousesTable({tableData,handleEdit,handleDelete}) {
      
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
                                    <Button onClick={() => handleEdit(warehouse.id)} outline type="button">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(warehouse.id)} outline type="button">
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
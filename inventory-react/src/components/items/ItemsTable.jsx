import { Table, Button } from "@trussworks/react-uswds";

export default function ItemsTable({tableData,handleEdit,handleDelete}) {
      
    return(
        <>
          <Table striped fullWidth className="bg-primary-lighter">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Button onClick={() => handleEdit(item.id)} outline type="button">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(item.id)} outline type="button">
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
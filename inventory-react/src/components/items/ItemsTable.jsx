import { Table, Button, ModalToggleButton, ModalHeading, Modal } from "@trussworks/react-uswds";
import { useRef, useState } from "react";
import ItemsUpdateForm from "./ItemsUpdateForm";

export default function ItemsTable({ tableData, handleItemUpdate, handleDelete }) {
  const editModalRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Table striped fullWidth className="bg-primary-lighter">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <ModalToggleButton modalRef={editModalRef} opener onClick={() => handleOpenModal(item)}>
                    Edit
                  </ModalToggleButton>
                  <Button onClick={() => handleDelete(item.id)} className="bg-secondary-darker" type="button">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal id="edit-item-form-modal" ref={editModalRef}>
        <ModalHeading>Edit Item Details</ModalHeading>
        {selectedItem && (
          <div>
            <ItemsUpdateForm oldItem={selectedItem} handleItemUpdate={handleItemUpdate}/>
          </div> 
        )}
      </Modal>
    </>
  );
}
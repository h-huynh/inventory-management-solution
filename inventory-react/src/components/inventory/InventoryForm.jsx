import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";
export default function InventoryForm({handleNewInventory}) {
    const url = 'http://localhost:8080/inventory';
    
    function handleSubmit(event) {

        // preventing page refresh
        event.preventDefault();

        const data = new FormData(event.target);


        // creating inventory object
        const newInventory = {
            inventoryId : {
                itemId : data.get('itemId'),
                warehouseId : data.get('warehouseId')
            },
            warehouse : {
                id : data.get('warehouseId')
            },
            item : {
                id : data.get('itemId'),
            },
            quantity : data.get('quantity')
        }

        fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newInventory)
        })
            .then(data => data.json())
            .then(returnedData => {
                // calling handleNewInventory from Inventory.jsx to add the inventory to the table
                handleNewInventory(returnedData);

                //reseting the form
                event.target.reset();
            })
            .catch(error => console.error(error))
    }
    
    return (
        <>
            <Form onSubmit={handleSubmit}> 
                <Label htmlFor="item-id-input">Item ID</Label>
                <TextInput id="item-id-input" name="itemId" type="number"/>
                
                <Label htmlFor="warehouse-id-input">Warehouse ID</Label>
                <TextInput id="warehouse-id-input" name="warehouseId" type="number"/>

                <Label htmlFor="quantity-input">Quantity</Label>
                <TextInput id="quantity-input" name="quantity" type="number"/>

                <Button type="submit" data-close-modal='true'>Submit</Button>

            </Form>
        </>
    );
}
import { GridContainer, ProcessList, ProcessListHeading, ProcessListItem } from "@trussworks/react-uswds";

export default function Home() {
    
    // documentation page - relevant instructions and information here
    return (
        <>
            <GridContainer>
                <ProcessList>
                    <ProcessListItem>
                        <ProcessListHeading type="h4">Manage Warehouses</ProcessListHeading>
                        <p className="margin-top-05">
                           Warehouses stores a list of all items with their respective ids, names, location, current storage, and maximum capacity.
                           When creating new warehouses, maximum capacity must be set to a minimum of atleast 10. Use the IDs as a reference for
                           managing inventory. 
                        </p>
                    </ProcessListItem>

                    <ProcessListItem>
                        <ProcessListHeading type="h4">Manage Items Catalog</ProcessListHeading>
                        <p className="margin-top-05">
                            The item catalog stores a list of all items with their respective ids and names. Use this as a reference sheet to manage inventory.
                        </p>
                    </ProcessListItem>

                    <ProcessListItem>
                        <ProcessListHeading type="h4">Manage Inventory</ProcessListHeading>
                        <p className="margin-top-05">
                            Inventory manages all warehouses and their stored items. It is sorted by item ID and displays the quantity of
                            a given item at a given warehouse. 

                            <br/>
                            <br/>

                            When creating new inventory objects, you must input a valid item ID and warehouse ID along with a quantity
                            that will not cause the current storage of a warehouse to exceed maximum capacity. Edited quantities must also
                            not cause the capacity to be exceeded.
                        </p>
                    </ProcessListItem>
                </ProcessList>
            </GridContainer>
        </>
    );
}
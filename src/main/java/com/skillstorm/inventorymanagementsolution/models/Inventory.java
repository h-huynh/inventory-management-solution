package com.skillstorm.inventorymanagementsolution.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "INVENTORY")
public class Inventory {

    @EmbeddedId
    private InventoryId inventoryId;

    @ManyToOne
    @MapsId("warehouseId") // Maps the warehouseId attribute of the embedded id
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @MapsId("itemId") // Maps the itemId attribute of the embedded id
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "quantity")
    private int quantity;

    public Inventory() {
    }

    public Inventory(InventoryId inventoryId, Warehouse warehouse, Item item, int quantity) {
        this.inventoryId = inventoryId;
        this.warehouse = warehouse;
        this.item = item;
        this.quantity = quantity;
    }

    public InventoryId getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(InventoryId inventoryId) {
        this.inventoryId = inventoryId;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((inventoryId == null) ? 0 : inventoryId.hashCode());
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
        result = prime * result + ((item == null) ? 0 : item.hashCode());
        result = prime * result + quantity;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Inventory other = (Inventory) obj;
        if (inventoryId == null) {
            if (other.inventoryId != null)
                return false;
        } else if (!inventoryId.equals(other.inventoryId))
            return false;
        if (warehouse == null) {
            if (other.warehouse != null)
                return false;
        } else if (!warehouse.equals(other.warehouse))
            return false;
        if (item == null) {
            if (other.item != null)
                return false;
        } else if (!item.equals(other.item))
            return false;
        if (quantity != other.quantity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Inventory [inventoryId=" + inventoryId + ", warehouse=" + warehouse + ", item=" + item + ", quantity=" + quantity + "]";
    }
}
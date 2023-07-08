package com.skillstorm.inventorymanagementsolution.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class InventoryId implements Serializable {
    
    @Column(name = "warehouse_id")
    private int warehouseId;

    @Column(name = "item_id")
    private int itemId;
    
    public InventoryId() {
    }

    public InventoryId(int warehouseId, int itemId) {
        this.warehouseId = warehouseId;
        this.itemId = itemId;
    }

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + warehouseId;
        result = prime * result + itemId;
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
        InventoryId other = (InventoryId) obj;
        if (warehouseId != other.warehouseId)
            return false;
        if (itemId != other.itemId)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "InventoryId [warehouseId=" + warehouseId + ", itemId=" + itemId + "]";
    }
}
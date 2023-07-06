package com.skillstorm.inventorymanagementsolution.models;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class InventoryId implements Serializable {
    private int warehouse;
    private int item;
    
    public InventoryId(int warehouse, int item) {
        this.warehouse = warehouse;
        this.item = item;
    }

    public int getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(int warehouse) {
        this.warehouse = warehouse;
    }

    public int getItem() {
        return item;
    }

    public void setItem(int item) {
        this.item = item;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + warehouse;
        result = prime * result + item;
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
        if (warehouse != other.warehouse)
            return false;
        if (item != other.item)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "InventoryId [warehouse=" + warehouse + ", item=" + item + "]";
    }

}

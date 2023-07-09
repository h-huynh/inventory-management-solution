package com.skillstorm.inventorymanagementsolution.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;

@Entity
@Table(name = "WAREHOUSES")
public class Warehouse {

    @Id
    @Column(name = "warehouse_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "warehouse_name")
    private String name;

    @Min(10)
    @Column(name = "maximum_capacity")
    private int maximumCapacity;

    public Warehouse() {
    }

    public Warehouse(String name, int maximumCapacity) {
        this.name = name;
        this.maximumCapacity = maximumCapacity;
    }

    public Warehouse(int id, String name, int maximumCapacity) {
        this.id = id;
        this.name = name;
        this.maximumCapacity = maximumCapacity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaximumCapacity() {
        return maximumCapacity;
    }

    public void setMaximumCapacity(int maximumCapacity) {
        this.maximumCapacity = maximumCapacity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + maximumCapacity;
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
        Warehouse other = (Warehouse) obj;
        if (id != other.id)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (maximumCapacity != other.maximumCapacity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", name=" + name + ", maximumCapacity=" + maximumCapacity + "]";
    }

    
}

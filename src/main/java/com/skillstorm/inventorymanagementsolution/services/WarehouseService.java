package com.skillstorm.inventorymanagementsolution.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementsolution.models.Warehouse;
import com.skillstorm.inventorymanagementsolution.repositories.WarehouseRepository;

@Service
public class WarehouseService {
    @Autowired
    WarehouseRepository warehouseRepository;

    // CREATE/UPDATE Warehouses
    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // READ Warehouses
    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAll();   
    }

    public Warehouse findWarehouseById(int id) {
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);
        if(warehouse.isPresent()) {        
            return warehouse.get();         
        }
        return null;
    }

    // DELETE Warehouses - this will delete corresponding items
    public void deleteWarehouse(Warehouse warehouse) {
        warehouseRepository.delete(warehouse);
    }    
}

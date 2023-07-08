package com.skillstorm.inventorymanagementsolution.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementsolution.models.Inventory;
import com.skillstorm.inventorymanagementsolution.repositories.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    InventoryRepository inventoryRepository;

     // CREATE/UPDATE Inventory
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // READ Inventory
    public List<Inventory> findAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory findInventoryByWarehouseId(int warehouseId) {
        Optional<Inventory> inventory = inventoryRepository.findByInventoryId_WarehouseId(warehouseId);
        if(inventory.isPresent()) {        
            return inventory.get();         
        }
        return null;
    }

    public Inventory findInventoryByItemId(int itemId) {
        Optional<Inventory> inventory = inventoryRepository.findByInventoryId_ItemId(itemId);
        if(inventory.isPresent()) {        
            return inventory.get();         
        }
        return null;
    }

    // for searching a specific warehouseId and itemID
    public Inventory findInventoryByWarehouseIdAndItemId(int warehouseId, int itemId) {
        Optional<Inventory> inventory = inventoryRepository.findByInventoryId_WarehouseIdAndInventoryId(warehouseId, itemId);
        if(inventory.isPresent()) {        
            return inventory.get();         
        }
        return null;
    }

    // DELETE Inventory entries
    public void deleteInventory(Inventory inventory) {
        inventoryRepository.delete(inventory);
    }    

}

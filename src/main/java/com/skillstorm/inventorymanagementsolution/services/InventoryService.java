package com.skillstorm.inventorymanagementsolution.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementsolution.models.Inventory;
import com.skillstorm.inventorymanagementsolution.models.InventoryId;
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

    public List<Inventory> findInventoryByWarehouseId(int warehouseId) {
        return inventoryRepository.findAllByInventoryId_WarehouseId(warehouseId);
    }

    public List<Inventory> findInventoryByItemId(int itemId) {
        return inventoryRepository.findAllByInventoryId_ItemId(itemId);
    }

    public int getTotalQuantityByWarehouseId(int warehouseId) {
        List<Inventory> inventoryList = inventoryRepository.findAllByInventoryId_WarehouseId(warehouseId);
        int totalQuantity = 0;
        for (Inventory inventory : inventoryList) {
            totalQuantity += inventory.getQuantity();
        }
        return totalQuantity;
    }

    // for searching a specific warehouseId and itemID
    public Inventory findInventoryByWarehouseIdAndItemId(int warehouseId, int itemId) {
        InventoryId inventoryId = new InventoryId(warehouseId, itemId);
        Optional<Inventory> inventory = inventoryRepository.findByInventoryId(inventoryId);
        if (inventory.isPresent()) {        
            return inventory.get();         
        }
        return null;
    }

    // DELETE Inventory entries
    public void deleteInventory(Inventory inventory) {
        inventoryRepository.delete(inventory);
    }    

}

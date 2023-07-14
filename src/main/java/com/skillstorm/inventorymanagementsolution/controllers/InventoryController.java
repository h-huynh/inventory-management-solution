package com.skillstorm.inventorymanagementsolution.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementsolution.models.Inventory;
import com.skillstorm.inventorymanagementsolution.services.InventoryService;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventoryList = inventoryService.findAllInventory();
        return new ResponseEntity<>(inventoryList, HttpStatus.OK);
    }

    @GetMapping("/{warehouseId}")
    public ResponseEntity<List<Inventory>> getInventoryByWarehouseId(@PathVariable int warehouseId) {
        List<Inventory> inventoryList = inventoryService.findInventoryByWarehouseId(warehouseId);
        if (inventoryList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(inventoryList, HttpStatus.OK);
        }
    }

    @GetMapping("/{warehouseId}/{itemId}")
    public ResponseEntity<Inventory> getInventory(@PathVariable int warehouseId, @PathVariable int itemId) {
        Inventory inventory = inventoryService.findInventoryByWarehouseIdAndItemId(warehouseId, itemId);
        if (inventory != null) {
            return new ResponseEntity<>(inventory, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{warehouseId}/totalQuantity")
    public ResponseEntity<?> getWarehouseTotalQuantity(@PathVariable int warehouseId) {
        int totalQuantity = inventoryService.getTotalQuantityByWarehouseId(warehouseId);

        return new ResponseEntity<>(totalQuantity, HttpStatus.OK);
    }

    // CREATE method for inventory. Does not allow request that cause warehouse capacity to be exceeded.
    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        if (inventory == null || inventory.getQuantity() < 0) {
            return ResponseEntity.badRequest().build(); // Return a bad request if the inventory or quantity is invalid
        }

        // Fetch the current total quantity of the warehouse
        int totalQuantity = inventoryService.getTotalQuantityByWarehouseId(inventory.getWarehouse().getId());

        // Get the maximum capacity of the warehouse
        int maximumCapacity = inventory.getWarehouse().getMaximumCapacity();

        // Calculate the new total quantity after adding the inventory
        int newTotalQuantity = totalQuantity + inventory.getQuantity();

        // Check if the new total quantity exceeds the maximum capacity
        if (newTotalQuantity > maximumCapacity) {
            return ResponseEntity.badRequest().build(); // Return a bad request if the new total quantity exceeds the maximum capacity
        }

        // Additional validation logic as needed

        Inventory createdInventory = inventoryService.saveInventory(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInventory);
    }


    // UPDATE method for inventory. Does not allow request that cause warehouse capacity to be exceeded.
    @PutMapping("/{warehouseId}/{itemId}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable int warehouseId, @PathVariable int itemId, @Valid @RequestBody Inventory inventory) {
        Inventory existingInventory = inventoryService.findInventoryByWarehouseIdAndItemId(warehouseId, itemId);
        if (existingInventory == null) {
            return ResponseEntity.notFound().build();
        }
    
        // Fetch the current total quantity of the warehouse
        int totalQuantity = inventoryService.getTotalQuantityByWarehouseId(warehouseId);
    
        // Get the maximum capacity of the warehouse
        int maximumCapacity = existingInventory.getWarehouse().getMaximumCapacity();
    
        // Calculate the new total quantity after updating the inventory
        int newTotalQuantity = totalQuantity - existingInventory.getQuantity() + inventory.getQuantity();
    
        // Check if the new total quantity exceeds the maximum capacity
        if (newTotalQuantity > maximumCapacity) {
            return ResponseEntity.badRequest().build(); // Return a bad request if the new total quantity exceeds the maximum capacity
        }
    
        inventory.setInventoryId(existingInventory.getInventoryId());
        Inventory updatedInventory = inventoryService.saveInventory(inventory);
        return ResponseEntity.ok(updatedInventory);
    }

    @DeleteMapping("/{warehouseId}/{itemId}")
    public ResponseEntity<Void> deleteInventory(@PathVariable int warehouseId, @PathVariable int itemId) {
        Inventory existingInventory = inventoryService.findInventoryByWarehouseIdAndItemId(warehouseId, itemId);
        if (existingInventory != null) {
            inventoryService.deleteInventory(existingInventory);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

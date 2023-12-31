package com.skillstorm.inventorymanagementsolution.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementsolution.models.Inventory;
import com.skillstorm.inventorymanagementsolution.models.InventoryId;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    // a custom method to find by both warehouseId and itemId
    Optional<Inventory> findByInventoryId_WarehouseIdAndInventoryId(int warehouseId, int itemId);

    // to search for a specific warehouse id in the composite key
    Optional<Inventory> findByInventoryId_WarehouseId(int warehouseId);

    // to search for a specific item id in the composite key
    Optional<Inventory> findByInventoryId_ItemId(int itemId);

    // to search for all inventory by a certain warehouseId
    List<Inventory> findAllByInventoryId_WarehouseId(int warehouseId);

    // to search for all inventory by a certain itemId
    List<Inventory> findAllByInventoryId_ItemId(int warehouseId);

    // to search for based on inventoryId
    Optional<Inventory> findByInventoryId(InventoryId inventoryId);
    

}

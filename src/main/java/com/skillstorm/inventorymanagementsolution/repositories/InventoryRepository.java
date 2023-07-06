package com.skillstorm.inventorymanagementsolution.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementsolution.models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    
}

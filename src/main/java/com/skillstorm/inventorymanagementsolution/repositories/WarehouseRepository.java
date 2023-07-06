package com.skillstorm.inventorymanagementsolution.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementsolution.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer>{
    
}

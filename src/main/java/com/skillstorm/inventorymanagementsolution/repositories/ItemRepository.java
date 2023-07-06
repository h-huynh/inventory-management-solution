package com.skillstorm.inventorymanagementsolution.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementsolution.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    
}

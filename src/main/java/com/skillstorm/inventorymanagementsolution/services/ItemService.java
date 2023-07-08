package com.skillstorm.inventorymanagementsolution.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementsolution.models.Item;
import com.skillstorm.inventorymanagementsolution.repositories.ItemRepository;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    // CREATE/UPDATE Items
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    // READ Items
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    public Item findItemById(int id) {
        Optional<Item> item = itemRepository.findById(id);
        if(item.isPresent()) {        
            return item.get();         
        }
        return null;
    }

    // DELETE Items
    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }

}

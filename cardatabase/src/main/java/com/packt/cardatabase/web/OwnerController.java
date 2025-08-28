package com.packt.cardatabase.web;

import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerController {

    private final OwnerRepository ownerRepository;

    public OwnerController(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public Iterable<Owner> findAll() {
        return ownerRepository.findAll();
    }
}

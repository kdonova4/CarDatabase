package com.packt.cardatabase;

import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class OwnerRepositoryTest {

    @Autowired
    private OwnerRepository ownerRepository;

    @Test
    void saveOwner() {
        ownerRepository.save(new Owner("Test", "Owner"));

        assertTrue(ownerRepository.findByFirstName("Test").isPresent());
    }

    @Test
    void deleteOwner() {
        ownerRepository.save(new Owner("Test", "Owner"));
        ownerRepository.deleteAll();
        assertEquals(ownerRepository.count(), 0);
    }
}

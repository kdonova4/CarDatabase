package com.packt.cardatabase;

import com.packt.cardatabase.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class CardatabaseApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);

	private final CarRepository carRepository;
	private final OwnerRepository ownerRepository;
	private final AppUserRepository appUserRepository;

    public CardatabaseApplication(CarRepository carRepository, OwnerRepository ownerRepository, AppUserRepository appUserRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
        this.appUserRepository = appUserRepository;
    }


    public static void main(String[] args) {

		SpringApplication.run(CardatabaseApplication.class, args);

		logger.info("APPLICATION STARTED");
	}

	@Override
	public void run(String... args) throws Exception {
		appUserRepository.save(new AppUser("MidwayMonster2223", "$2y$10$jOlhxYYucMXOHguWN817c.mqaFy2GdAv0lQu1w.eCsAuK.UFX09z2", "USER"));
		appUserRepository.save(new AppUser("admin202", "$2y$10$zbaUcxICEq067Hoil.xtlO7Qp.JiGY/0.VKkrWPjjACxV3m4kN1lG", "ADMIN"));
		appUserRepository.save(new AppUser("kevin123", "$2y$10$jOlhxYYucMXOHguWN817c.mqaFy2GdAv0lQu1w.eCsAuK.UFX09z2", "USER"));
		appUserRepository.save(new AppUser("DONOSUAR2223", "$2y$10$23eJMu3m.Y781Ikblz2FJOTWDH3DnwiG7ldQclHaw6CW3WcK6mWLK", "USER"));

		Owner owner1 = new Owner("Kevin", "Donovan");
		Owner owner2 = new Owner("Michael", "Jordan");
		ownerRepository.saveAll(Arrays.asList(owner1, owner2));

		carRepository.save(new Car("Ford", "Mustang", "Blue", "ADF-1121", 2023, 59000, owner2));
		carRepository.save(new Car("Nissan", "Leaf", "White", "SSJ-5653", 2020, 48000, owner2));
		carRepository.save(new Car("Toyota", "Prius", "Red", "ADF-1944", 2022, 39000, owner1));

		for(Car car : carRepository.findAll()) {
			logger.info("brand: {}, model: {}",
					car.getBrand(), car.getModel());
		}
	}
}

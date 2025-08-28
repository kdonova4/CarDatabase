package com.packt.cardatabase;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI carDatabaseOpenAPI() {
        return new OpenAPI()
                .openapi("3.0.3")
                .info(new Info()
                        .title("Car REST API")
                        .description("My Car Stock")
                        .version("1.0"));
    }
}

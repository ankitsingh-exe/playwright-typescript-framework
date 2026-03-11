import { faker } from "@faker-js/faker";


export class RandomDataGenerator {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getPassword(): string {
        return faker.internet.password();
    }    

}

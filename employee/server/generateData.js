const faker = require("@faker-js/faker")
const database = { employees: []};
const NoOfEmployees = 3;

for (let i = 1; i<= NoOfEmployees; i++) {
    database.employees.push({
        id: i,
    name: faker.name.fullName(),
    email: faker.email(),
    phone: faker.phone.number(),
    dob:faker.date.birthdate(),
    gender:faker.name.fullname({gender:'male'|'female'}),
    hobbies: faker.random.alpha()

    });
}

console.log(JSON.stringify(database));

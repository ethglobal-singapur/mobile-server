import { faker, fakerTR } from "@faker-js/faker";
const createMockData = () => {
  const mockData = Array.from(new Array(10)).fill(0);

  const newData = mockData.map((_, index) => {
    return {
      id: index,
      name: fakerTR.name.fullName(),
      age: faker.number.int({ min: 18, max: 60 }),
      email: fakerTR.location.streetAddress(),
    };
  });
  return newData;
};

export default createMockData;

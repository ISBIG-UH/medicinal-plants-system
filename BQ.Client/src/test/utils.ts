import { faker } from '@faker-js/faker';

export const getRandomSentences = () =>
    Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () =>
        faker.lorem.sentence(),
    );

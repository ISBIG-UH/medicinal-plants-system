import { faker } from '@faker-js/faker';
import { getRandomSentences } from '../utils';

export const getMonographMock = () => {
    return <Monograph>{
        id: faker.number.int(),
        name: faker.word.noun(),
        genus: faker.word.noun(),
        subsp: faker.word.noun(),
        f: faker.word.noun(),
        species: faker.word.noun(),
        authors: faker.person.fullName(),
        family: faker.word.noun(),
        var: faker.word.noun(),
        subfamily: faker.word.noun(),
        sy: getRandomSentences(), // synonyms
        vul: getRandomSentences(), // vulgar/common names
        hab: faker.lorem.sentence(),
        des: faker.lorem.paragraph(),
        cmp: faker.lorem.sentence(),
        use: faker.lorem.sentences(2),
        pro: faker.lorem.words(4),
        app: faker.lorem.words(4),
        cul: faker.lorem.words(4),
        bib: getRandomSentences(), // bibliography entries
    };
};

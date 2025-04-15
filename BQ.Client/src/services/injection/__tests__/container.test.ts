import { Container, injectable } from 'inversify';
import { expect, test } from 'vitest';

interface IAwesomeInterface {
    sum(a: number, b: number): number;
}

@injectable()
class AwesomeClass implements IAwesomeInterface {
    sum(a: number, b: number): number {
        return a + b;
    }
}

const IAwesomeInterfaceSymbol = Symbol.for('IAwesomeInterface');

test('Inversify container', () => {
    const serviceContainer = new Container();
    serviceContainer.bind(IAwesomeInterfaceSymbol).to(AwesomeClass);

    const awesome = serviceContainer.get<IAwesomeInterface>(
        IAwesomeInterfaceSymbol,
    );
    expect(awesome.sum(1, 2)).toBe(3);
});

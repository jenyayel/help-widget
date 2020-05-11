import loader, { DEFAULT_NAME } from '../src/loader';
import { install, testConfig, randomStr, currentScript } from './common';
import { Configurations } from '../src/models';

describe('loader', () => {

    it('should load single default instance', () => {
        // arrange
        const expectedName = DEFAULT_NAME;
        install(expectedName);
        const renderMock = jest.fn();

        // act
        loader(window, testConfig(), null, renderMock);

        // assert
        expect(window[expectedName]).toBeDefined();
        expect(window['loaded-' + expectedName]).toBeDefined();
        expect(renderMock).toBeCalled();
    });

    it('should load single named instance', () => {
        // arrange
        const expectedName = randomStr(5);
        install(expectedName);
        const renderMock = jest.fn();

        // act
        loader(window, testConfig(), currentScript(expectedName), renderMock);

        // assert
        expect(window[expectedName]).toBeDefined();
        expect(window['loaded-' + expectedName]).toBeDefined();
        expect(renderMock).toBeCalled();
    });

    it('should load multiple named instance', () => {
        // arrange
        const expectedName1 = randomStr(5);
        const expectedName2 = randomStr(5);
        const expectedConfig1 = { debug: true };
        const expectedConfig2 = { debug: false };
        install(expectedName1, expectedConfig1);
        install(expectedName2, expectedConfig2);

        const renderMock1 = jest.fn((_: HTMLElement, __: Configurations) => undefined);
        const renderMock2 = jest.fn((_: HTMLElement, __: Configurations) => undefined);

        // act
        loader(window, testConfig(), currentScript(expectedName1), renderMock1);
        loader(window, testConfig(), currentScript(expectedName2), renderMock2);

        // assert
        expect(window[expectedName1]).toBeDefined();
        expect(window[expectedName2]).toBeDefined();

        expect(window['loaded-' + expectedName1]).toBeDefined();
        expect(window['loaded-' + expectedName2]).toBeDefined();

        expect(renderMock1).toBeCalledWith(expect.anything(), expect.objectContaining(expectedConfig1));
        expect(renderMock2).toBeCalledWith(expect.anything(), expect.objectContaining(expectedConfig2));
    });
});

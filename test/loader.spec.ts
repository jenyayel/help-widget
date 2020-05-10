import loader, { DEFAULT_NAME } from '../src/loader';
import { install, testConfig, randomStr } from './common';

describe('loader', () => {

    it('should load single default instance', () => {
        // arrange
        const expectedName = DEFAULT_NAME;
        install(window, expectedName);
        const renderMock = jest.fn();

        // act
        loader(window, testConfig(), renderMock);

        // assert
        expect(window[expectedName]).toBeDefined();
        expect(window['loaded-' + expectedName]).toBeDefined();
        expect(renderMock).toBeCalled();
    });

    it('should load single named instance', () => {
        // arrange
        const expectedName = randomStr(5);
        install(window, expectedName);
        const renderMock = jest.fn();

        // act
        loader(window, testConfig(), renderMock);

        // assert
        expect(window[expectedName]).toBeDefined();
        expect(window['loaded-' + expectedName]).toBeDefined();
        expect(renderMock).toBeCalled();
    });
});

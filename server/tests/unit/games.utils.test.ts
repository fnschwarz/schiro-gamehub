import { isSteamApp, hasValidGameIdFormat } from '../../src/utils/games.utils';

// ignore all console output
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('testing games.utils file', () => {
    test('testing isSteamApp function', async () => {
        expect(await isSteamApp(NaN)).toBe(false);
        expect(await isSteamApp(1)).toBe(false);
        expect(await isSteamApp(5)).toBe(false);
        expect(await isSteamApp(-10)).toBe(false);
        expect(await isSteamApp(1000000000000000)).toBe(false);
        expect(await isSteamApp(-1000000000000000)).toBe(false);
        expect(await isSteamApp(1000000000000000000)).toBe(false);
        expect(await isSteamApp(-1000000000000000000)).toBe(false);
        expect(await isSteamApp(10)).toBe(true);
        expect(await isSteamApp(730)).toBe(true);
        expect(await isSteamApp(2967990)).toBe(true);
        expect(await isSteamApp(813780)).toBe(true);
        expect(await isSteamApp(2524890)).toBe(true);
    })

    test('testing hasValidGameIdFormat function', () => {
        expect(hasValidGameIdFormat(NaN)).toBe(false);
        expect(hasValidGameIdFormat(0)).toBe(false);
        expect(hasValidGameIdFormat(-1)).toBe(false);
        expect(hasValidGameIdFormat(1)).toBe(false);
        expect(hasValidGameIdFormat(5)).toBe(false);
        expect(hasValidGameIdFormat(1000000000000000)).toBe(false);
        expect(hasValidGameIdFormat(-1000000000000000)).toBe(false);
        expect(hasValidGameIdFormat(1000000000000000000)).toBe(false);
        expect(hasValidGameIdFormat(-1000000000000000000)).toBe(false);
        expect(hasValidGameIdFormat(10)).toBe(true);
        expect(hasValidGameIdFormat(221100)).toBe(true);
        expect(hasValidGameIdFormat(1000)).toBe(true);
    });
});
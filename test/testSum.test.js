const sum = require('./testSum');

test('Summed Correctly: ', () => {
    expect(sum(1, 2)).toBe(3);
});
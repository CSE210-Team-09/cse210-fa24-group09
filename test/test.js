function testAddition() {
    if (1 + 1 !== 2) {
      throw new Error("Test failed: 1 + 1 did not equal 2");
    } else {
      console.log("Test passed: 1 + 1 equals 2");
    }
  }

  test('Addition test: ', () => {
    expect(testAddition()).toBeUndefined();
  });
  
  testAddition();
  
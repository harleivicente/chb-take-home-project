const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });


  it("Returns the partitionKey when a String is passed in", () => {

    const SHORT_STRING = 'apple';
    const event = { partitionKey: SHORT_STRING };

    const response = deterministicPartitionKey(event);
    expect(response).toBe(SHORT_STRING);

  });

  it("Returns a stringified value when input is not String", () => {

    const NUMBER = 3423;
    const BOOLEAN = true;
    const ARRAY = ['3', '3'];

    const responseNumber = deterministicPartitionKey({ partitionKey: NUMBER });
    const responseBoolean = deterministicPartitionKey({ partitionKey: BOOLEAN });
    const responseArray = deterministicPartitionKey({ partitionKey: ARRAY });

    expect(responseNumber).toBe(`${NUMBER}`);
    expect(responseBoolean).toBe(`true`);
    expect(responseArray).toBe(JSON.stringify(ARRAY));

  })

  it('Returns a hash when partitionKey is not provided', () => {

    const event = { other: 3 };
    const response = deterministicPartitionKey(event);

    const eventAsString = JSON.stringify(event);
    const expectedHash = crypto.createHash("sha3-512").update(eventAsString).digest("hex");
    expect(response).toBe(expectedHash);

  })

  it('Returns a hash when partitionKey is a very large string', () => {

    const result = deterministicPartitionKey({ partitionKey: LARGE_STRING });
    const expectedResult = crypto.createHash("sha3-512").update(LARGE_STRING).digest("hex");
    expect(result).toBe(expectedResult);

  })

});


CONST = LARGE_STRING = 'Aa.adfkadfsdfadfafadfadfadfd234234Aasdfadfafadfadfadfd234234Aasdfadfafadfadfadfd234234Aasdfadfafadfadfadfd234234sdfadfafadfadfadfadfafdadfadfadfadsfadfadfadsfd234234Aasdfadfafadfadfadfd234234Aasdfadfafadfadfadfd234234Aasdfadfafadfadfadfd23423adfadf23423423adfadfadf';
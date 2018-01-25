const expect = require('expect');
const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    const from = 'someguy';
    const text = 'some message';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    })
  });
});

var expect = require('expect');

var {generateMessage} = require('./message')


describe('generateMessage', () => {
  it('should generate the correct message object', () => {

    var from = 'Govind';
    var text = 'Hello world';

    var res = generateMessage(from, text);

    expect(res).toInclude({
      from,
      text
    });
    expect(typeof res.createdAt).toBe('number');
  });
})

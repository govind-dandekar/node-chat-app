var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');



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

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    //pass from, lat and lon -> make asserts correct vals, urls is correct, createdAt is number
    var from = 'Govind'
    var latitude = 1;
    var longitude = 2;
    var url = 'https://www.google.com/maps?q=1,2'

    var res = generateLocationMessage(from, latitude, longitude);

    expect(res).toInclude({from, url});
    expect(typeof res.createdAt).toBe('number');

  })
})

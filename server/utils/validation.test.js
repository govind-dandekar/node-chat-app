const expect = require('expect');
const {isRealString} = require('./validation.js');


//import isRealString
//3 test cases
//should reject non-string values
//should reject strings with only spaces
//should allow strings with non-space characters (pass in valid values ' I O W A')

describe('isRealString', ()=> {
  it('should reject non-string values', () => {
    var str = 12345;
    expect(isRealString(str)).toBeFalsy();
  })

  it('should reject a string with only spaces', () => {
    var str = '      ';
    expect(isRealString(str)).toBeFalsy();
  })

  it('should allow strings will non-space characters', () => {
    var str = ' I O W A ';
    expect(isRealString(str)).toBeTruthy();
  })
})

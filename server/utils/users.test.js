const expect = require('expect');

const {Users} = require('./users');



describe('Users', ()=> {

  var users;

  beforeEach(()=> {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Govind',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Shaneeda',
      room: 'React'
    },
    {
      id: '3',
      name: 'Ayaana',
      room: 'Node Course'
    },
  ]
  })



  it('should add new user', ()=>{
    var users = new Users();
    var user = {
      id: '1234',
      name: 'Govind',
      room: 'Iowa'
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user])
    //have to use toEqual for arrays and objects
  })

  it('should remove a user', ()=>{
    var userId = '1'
    var removedUser = users.removeUser(userId);

    expect(removedUser.id).toEqual(userId);
    expect(users.users.length).toBe(2);
  })
  //
  it('should not remove user', ()=> {

    var userId = '55'
    var removedUser = users.removeUser(userId);

    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {

    var userId = '2'
    var foundUser = users.getUser(userId);

    expect(foundUser.id).toBe(userId);
  });
  //
  it('should not find user', () => {
    var userId = '55'
    var foundUser = users.getUser(userId);

    expect(foundUser).toBeFalsy();
  })

  it('should returns names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Govind', 'Ayaana']);
  })

  it('should returns names for react', () => {
    var userList = users.getUserList('React');

    expect(userList).toEqual(['Shaneeda']);
  })

})

[{
  id: '/234skdgn;an',
  name: 'Govind',
  room: 'The Office Fans'
}]

//addUser(id, name, room)
//removeUser(id) [take off people list  ]
//getUser(id) return object
//getUserList(room) -> return array of user names and print to client



class Users {
  constructor(){
    //no args -- start with empty array of users
    this.users = [];
  }

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    //return user that was removed
    //user filter in both function
    var user = this.getUser(id);

    if (user) {
        this.users = this.users.filter((user) => {
          return user.id !== id
        });
    }
    return user;
  }

  getUser(id){
    var user = this.users.filter((user) => {
      return user.id === id;
    })[0];

    return user;
  }

  getUserList(room){
    //get list of all users in a room
    var users = this.users.filter((user) => {
      return user.room === room;
    })

    var namesArray = users.map((user) => {
      return user.name;
    })

    return namesArray;
  }
}

module.exports = {
  Users
}


// class Person {
//   constructor (name, age) {
//     //called by default with agruments passed
//     //console.log(name, age);
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Govind', 40);
//
// var description = me.getUserDescription();
// console.log(description);

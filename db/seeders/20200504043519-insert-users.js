'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ firstName: "Lebron",lastName:"James",username: 'Demo-lition', email: 'demo@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Virginia",lastName:"Woolf",username: 'vdog', email: 'yusuke@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Alexandria", lastName: "Ocasio-Cortez", username: 'aocasio-cortez', email: 'aocasio-cortez@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Johann Sebastian", lastName: "Bach", username: 'jbach', email: 'jbach@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Helen", lastName: "Mirren", username: 'hmirren', email: 'hmirren@example.com', hashedPassword: createPassword() }),
      r({ firstName: "James K.", lastName: "Polk", username: 'jpolk', email: 'jpolk@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Judi", lastName: "Dench", username: 'jdench', email: 'jdench@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Marilynne", lastName: "Robinson", username: 'mrobinson', email: 'mrobinson@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Jesmyn", lastName: "Ward", username: 'jward', email: 'jward@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Toni", lastName: "Morrison", username: 'tmorrison', email: 'tmorrison@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Clare", lastName: "Donohue-Meyer", username: 'cdonohue-meyer', email: 'cdonohue-meyer@example.com', hashedPassword: createPassword() }),
      r({ firstName: "Mikhail", lastName: "Bulgakov", username: 'mbulgakov', email: 'mbulgakov@example.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};

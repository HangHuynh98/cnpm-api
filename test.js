const _ = require("lodash")

const a ={
    status: true,
    isAdmin: false,
    role: [],
    email: 'kai@gmail.com',
    username: 'kai',
    hash_password: '390181a77b4480eabd03402c3a26d75235abdbcbbe6792df916352b9d232ab0f',
    salt_password: '45eb646bd1043ed252c1c45f910d086e63dbd78c546a38e5',
    __v: 0
  }

  console.log(_.omit(a, ['hash_password', 'salt_password']))
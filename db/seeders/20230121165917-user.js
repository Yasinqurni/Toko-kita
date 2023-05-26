'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        fullname: "Indra Suryadi",
        address: "mbrebes kulon",
        phone: "0822392331313",
        email: "indra@gmail.com",
        password: "$2a$08$H3pkeV0YGi9rj9c5QivEs.YGA46DMlviVHOwasm7Q6eNp5jHDTNQK",
        //password: "indracwii",
        role: "user"
      },
      {
        fullname: "Indah Olshop",
        address: "jakarta Barat",
        phone: "08223923313312",
        email: "Indaholshop@gmail.com",
        password: "$2a$08$P5nI20gX.D0JtrgTBpJM5ONGEDsVDiwul0hqEB/2Igrp6wFbkn2qy",
        // password: "indah123",
        role: "seller"
      },
      {
        fullname: "admin",
        address: "jakarta pusat",
        phone: "08000112155",
        email: "admin@gmail.com",
        password: "$2a$08$ucrl/vLBLgef6FoPW8FSpuomC9oF6jTmVNzcGiS38nQK2dSDRPzFC",
        // password: "bingleshop-aja",
        role: "admin"
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {})
  }
}

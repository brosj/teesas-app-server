'use strict';
import { Model } from 'sequelize';

interface userAttributes {
  childName: string;
  email: string;
  phoneNumber: number;
  countryCode: number;
  password: string;
  grade: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<userAttributes> 
  implements userAttributes {
    childName!: string;
    email!: string;
    phoneNumber!: number;
    countryCode!: number;
    password!: string;
    grade!: string;

    static associate(models: any) {
      // define association here
      /*
      User.hasMany(models.Lesson, {
        sourceKey: 'email',
        foreignKey: 'email',
        as: 'Lessons'
       });
      */
    }
  }

  User.init({
    childName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    countryCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
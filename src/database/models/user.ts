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

const User = (sequelize: any, DataTypes: any) => {
  class User extends Model<userAttributes> 
  implements userAttributes {
    childName!: string;
    email!: string;
    phoneNumber!: number;
    countryCode!: number;
    password!: string;
    grade!: string;
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
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

module.exports = User;
export default User;
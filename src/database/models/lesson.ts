'use strict';
import { Model } from 'sequelize';

interface lessonAttributes {
  name: string;
  startDate: Date;
  duration: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Lesson extends Model<lessonAttributes> implements lessonAttributes {
    name!: string;
    startDate!: Date;
    duration!: number;

    static associate(models: any) {
      // define association here
      // Lesson.belongsTo(models.User);
    }
  }

  Lesson.init(
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Lesson',
    }
  );

  return Lesson;
};

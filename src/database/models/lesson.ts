'use strict';
import { Model } from 'sequelize';

interface lessonAttributes {
  name: string;
  startDate: Date;
  duration: number;
}

const Lesson = (sequelize: any, DataTypes: any) => {
  class Lesson extends Model<lessonAttributes> implements lessonAttributes {
    name!: string;
    startDate!: Date;
    duration!: number;
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
      timestamps: false,
      modelName: 'Lesson',
    }
  );

  return Lesson;
};

module.exports = Lesson;
export default Lesson;
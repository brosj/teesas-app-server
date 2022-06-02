import { Request, Response } from "express";
import db from "../database/models";
import Lesson from "../database/models/lesson";

// Get Lesson
export const getLesson = async (req: Request, res: Response) => {
  const { lessonName } = req.body;

  const lesson = await Lesson(db.sequelize, db.Sequelize.DataTypes).findOne({ where: { name: lessonName } });

  if (lesson === null) {
    return res.status(404).json({
      success: false,
      message: "Specified lesson is not available.",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Success.",
      data: lesson,
    });
  }
};

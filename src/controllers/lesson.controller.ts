import { Request, Response } from "express";
import pool from "../database/connection";

export const getLesson = async (req: Request, res: Response) => {
  // const id = req.user.id;
  const { lessonName } = req.body;

  try {
    const getLessonQuery = `SELECT name, "startDate", duration FROM "Lessons" WHERE name='${lessonName}'`;

    pool.query(getLessonQuery, (err: any, result: any) => {
      if (!err) {
        if (!result.rows[0]) {
          return res.json({
            success: false,
            message: "Specified lesson is not available.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Success.",
          data: result.rows,
        });
      }
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: "An Unexpected Error Occured.",
    });
  }
};

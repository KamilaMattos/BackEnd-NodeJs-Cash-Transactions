import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

export const schemaValidation =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const validate = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      })
      req.body = validate
      next()
    } catch (error: any) {
      return res.status(400).json({
        message: error.errors?.join(", "),
      })
    }
  }

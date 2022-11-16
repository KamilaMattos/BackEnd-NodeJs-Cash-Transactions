import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

export const schemaValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      const validate = await schema.validate(user, {
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

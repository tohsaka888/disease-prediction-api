// contract.ts
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

extendZodWithOpenApi(z);

const c = initContract();

const userContract = c.router({
  login: {
    method: "POST",
    path: "/api/users/login",
    responses: {
      200: z.object({
        token: z.string().openapi({
          title: "JWT token",
          description: "JWT token for authentication",
          example: "",
        }),
        success: z.boolean().openapi({
          title: "success flag",
          description: "sucess if flag is true, else the result is fail",
          example: true,
        }),
      }),
    },
    body: z.object({
      email: z.string().openapi({
        title: "email",
        description: "user's email",
        example: "156132264@qq.com",
      }),
      password: z.string().openapi({
        title: "password",
        description: "user's password",
        example: "swy156132264",
      }),
    }),
    summary: "Login to HuiZhen",
  },
  register: {
    method: "POST",
    path: "/api/users/register",
    responses: {
      200: c.type<Omit<UserType.User, "id">>(),
    },
    body: c.type<Omit<UserType.User, "id">>(),
    summary: "Get a post by id",
  },
  sendEmail: {
    method: "POST",
    path: "/api/users/sendEmail",
    responses: {
      200: z.object({
        status: z.string().openapi({
          title: "status",
          description: "status of sending email",
          example: "success",
        }),
      }),
    },
    body: z.object({
      email: z.string().openapi({
        title: "email",
        description: "user's email",
        example: "156132264@qq.com",
      }),
    }),
  },
  verifyEmail: {
    method: "POST",
    path: "/api/users/verifyEmail",
    responses: {
      200: z.object({
        status: z.string().openapi({
          title: "status",
          description: "status of sending email",
          example: "success",
        }),
        needRegister: z.boolean().openapi({
          title: "needRegister",
          description: "indicates if user needs to register",
          example: false,
        }),
        message: z.string().openapi({
          title: "message",
          description: "additional message",
          example: "User already exists",
        }),
      }),
      403: z.object({
        status: z.string().openapi({
          title: "status",
          description: "status of sending email",
          example: "error",
        }),
        message: z.string().openapi({
          title: "message",
          description: "error message",
          example: "Invalid code",
        }),
      }),
    },
    body: z.object({
      email: z.string().openapi({
        title: "email",
        description: "user's email",
        example: "156132264@qq.com",
      }),
      code: z.string().openapi({
        title: "code",
        description: "verification code",
        example: "ABC123",
      }),
    }),
  },
});

const contract = c.router({
  Users: userContract,
});

export const OpenAPIV1 = generateOpenApi(
  contract,
  {
    info: {
      title: "Api Document for HuiZhen",
      version: "1.0.0",
      // description: "Android App HuiZhen's Api Document",
    },
    tags: [
      {
        name: "Users",
        description: "Users Interface, such as: login/register",
      },
    ],
  },
  {
    setOperationId: true,
    jsonQuery: true,
  }
);

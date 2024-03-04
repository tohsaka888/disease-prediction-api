// contract.ts
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";

const c = initContract();

export const contract = c.router({
  login: {
    method: "POST",
    path: "/api/users/login",
    responses: {
      200: c.type<Omit<UserType.User, "id">>(),
    },
    body: c.type<Omit<UserType.User, "password">>(),
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
});

export const OpenAPIV1 = generateOpenApi(contract, {
  info: {
    title: "Api Document for HuiZhen",
    version: "1.0.0",
    description: "Android App HuiZhen's Api Document",
  },
});

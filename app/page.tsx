"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { OpenAPIV1 } from "@services/openapi/contract";

export default function OpenApiDocsPage() {
  return <SwaggerUI spec={OpenAPIV1} displayOperationId={true} />;
}

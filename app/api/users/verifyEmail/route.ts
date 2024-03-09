// export const runtime = "edge";
import MongoConnector from "@services/MongoConnector";
import { getEmailCode } from "@services/cache";
export async function POST(req: Request) {
  const { email, code } = await req.json();
  const db = await MongoConnector.getDb();

  // verify code
  const cachedEmailCode = await getEmailCode(email);

  if (cachedEmailCode !== code) {
    return Response.json(
      { status: "error", message: "Invalid code" },
      { status: 403 }
    );
  }
  const collection = db.collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    return Response.json(
      {
        status: "success",
        needRegister: false,
        message: "User already exists",
      },
      {
        status: 200,
      }
    );
  } else {
    return Response.json({
      status: "success",
      needRegister: true,
      message: "User does not exist",
    });
  }
}

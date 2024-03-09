import { cacheEmailCode } from "@services/cache";
import * as nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// export const runtime = "edge";

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "tohsaka888@qq.com",
    pass: "nsbmpqswkfkiceba",
  },
});

export async function POST(req: Request) {
  const { email } = await req.json();
  const randomCode = uuidv4().slice(0, 6).toUpperCase();
  try {
    await transporter.sendMail({
      from: "tohsaka888@qq.com",
      to: email,
      subject: "Hello 👋欢迎使用慧珍，请查收您的验证码",
      text: `您的验证码是：${randomCode}`,
    });
    await cacheEmailCode({ email, code: randomCode });
    return Response.json({ status: "success" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { status: "error", errorMsg: "发送失败" },
      { status: 500 }
    );
  }
}

import nodemailer from 'nodemailer';

type mailProps = {
  toEmail: string;
  subject: string;
  code: string;
};
export const sendEmail = async ({ toEmail, subject, code }: mailProps) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"FoodDrop" <${process.env.EMAIL}>`,
      to: toEmail,
      subject,
      html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f4f5; padding:24px;">
      <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:8px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        
        <h2 style="margin:0 0 12px; color:#111827; text-align:center; font-size:20px;">
          Verify your email
        </h2>

        <p style="margin:0 0 16px; color:#374151; text-align:center; font-size:14px; line-height:1.5;">
          Use the verification code below to complete your request.
          This code is valid for a short time.
        </p>

        <div style="margin:24px 0; text-align:center;">
          <span style="
            display:inline-block;
            color:#000000;
            padding:12px 24px;
            font-size:24px;
            letter-spacing:4px;
            font-weight:bold;
          ">
            ${code}
          </span>
        </div>
        <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />
        <p style="margin:0; color:#9ca3af; font-size:12px; text-align:center;">
          © ${new Date().getFullYear()} FoodDrop
        </p>
      </div>
    </div>
  `,
    };

    await transport.sendMail(mailOptions);
    console.log('MAIL SENT SUCCESSFULLY');
  } catch (error: any) {
    console.error('MAIL ERROR:', error);
    throw error;
  }
};

export const getPasswordResetOtpEmailTemplate = (
  otp: string,
  expiryMinutes: number = 5,
) => {
  const unideskLogoUrl =
    'https://unidesk-public-assets.s3.ap-south-1.amazonaws.com/unidesk-logo-light.png';

  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
        .content-wrapper {
          padding: 20px !important;
        }
        h2 {
          font-size: 22px !important;
        }
        .otp-box {
          font-size: 28px !important;
          letter-spacing: 6px !important;
        }
      }
    </style>
  </head>

  <body style="margin:0; padding:0; background:#f5f7fa; font-family:Arial, sans-serif; color:#2d2d2d;">

    <div style="width:100%; padding:40px 0;">
      <div class="email-container"
        style="max-width:650px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:#0B63E5; padding:28px; text-align:center;">
          <img src="${unideskLogoUrl}" alt="UniDesk Logo" style="height:52px;" />
        </div>

        <!-- Content -->
        <div class="content-wrapper" style="padding:36px 32px;">

          <!-- Title -->
          <h2 style="margin:0 0 16px; text-align:center; font-size:28px; color:#0B63E5;">
            Reset Your Password
          </h2>

          <p style="font-size:16px; text-align:center; margin:0 0 26px; line-height:1.6;">
            We received a request to reset your UniDesk account password.
            Use the One-Time Password (OTP) below to proceed.
          </p>

          <!-- OTP Box -->
          <div style="
            background:#f9fbff;
            border:1px solid #e2e8f0;
            border-radius:12px;
            padding:24px;
            text-align:center;
            margin-bottom:32px;
          ">
            <p style="margin:0 0 10px; font-size:15px; color:#555;">
              Your verification code
            </p>

            <div class="otp-box"
              style="
                font-size:34px;
                font-weight:700;
                letter-spacing:8px;
                color:#0B63E5;
                font-family:monospace;
              ">
              ${otp}
            </div>

            <p style="margin:12px 0 0; font-size:13px; color:#777;">
              This OTP is valid for <strong>${expiryMinutes} minutes</strong>.
            </p>
          </div>

          <!-- Security Notes -->
          <h3 style="margin:0 0 12px; font-size:20px; color:#0B63E5;">Security Notice</h3>

          <ul style="font-size:15px; line-height:1.8; padding-left:20px; margin:0 0 26px;">
            <li>Do not share this OTP with anyone.</li>
            <li>UniDesk will never ask you for your OTP via phone or email.</li>
            <li>If you did not request a password reset, you can safely ignore this email.</li>
          </ul>

          <p style="font-size:15px; margin:0;">
            If you need assistance, please contact the UniDesk support team.
          </p>

        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding-top:18px; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} UniDesk · School Management Platform
      </div>

    </div>

  </body>
  </html>
  `;
};

export const getSuperAdminUserCreationEmail = (
  role: string,
  name: string,
  user_code: string,
  temp_password: string,
  email: string,
  phone: string,
  schoolName: string,
  logo_url?: string,
  banner_url?: string,
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

        <!-- Banner -->
        ${
          banner_url
            ? `<img src="${banner_url}" style="width:100%; max-height:260px; object-fit:cover;" />`
            : ''
        }

        <div class="content-wrapper" style="padding:36px 32px;">

          <!-- School Logo -->
          ${
            logo_url
              ? `<div style="text-align:center; margin-bottom:26px;">
                  <img src="${logo_url}" alt="School Logo" style="max-height:110px; max-width:190px; object-fit:contain;" />
                </div>`
              : ''
          }

          <!-- Title -->
          <h2 style="margin:0 0 16px; text-align:center; font-size:28px; color:#0B63E5;">
            Your UniDesk Super Admin Account Is Ready 🎉
          </h2>

          <p style="font-size:16px; text-align:center; margin:0 0 26px; line-height:1.6;">
            A Super Admin account has been created for you on the
            <strong>UniDesk School Management Platform</strong>.
            You have been added to <strong>${schoolName}<strong/>
            Below are your login details and account information.
          </p>

          <!-- User Details -->
          <div
            style="background:#f9fbff; border:1px solid #e2e8f0; padding:22px 26px; border-radius:12px; margin-bottom:32px;">
            <h3 style="margin:0 0 16px; font-size:19px; color:#1a1a1a;">Account Information</h3>

            <table style="width:100%; border-collapse:collapse; font-size:15px;">
              <tbody>
                <tr>
                  <td style="padding:8px 0; font-weight:600;">School Name:</td>
                  <td style="padding:8px 0;">${schoolName}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">Name:</td>
                  <td style="padding:8px 0;">${name}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">Role:</td>
                  <td style="padding:8px 0;">${role}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">Email:</td>
                  <td style="padding:8px 0;">${email}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">Phone:</td>
                  <td style="padding:8px 0;">${phone}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">User Code:</td>
                  <td style="padding:8px 0;">${user_code}</td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-weight:600;">Temporary Password:</td>
                  <td style="padding:8px 0; font-family:monospace; font-size:15px;">${temp_password}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Important Notes -->
          <h3 style="margin:0 0 14px; font-size:20px; color:#0B63E5;">Important</h3>

          <ul style="font-size:15px; line-height:1.8; padding-left:20px; margin:0;">
            <li>Please log in using the temporary password provided above.</li>
            <li><strong>You will be required to reset your password immediately after login.</strong></li>
            <li>Do not share your login credentials with anyone.</li>
            <li>As a Super Admin, you have full access to all modules and settings.</li>
          </ul>

          <!-- Support -->
          <h3 style="margin:30px 0 12px; font-size:20px; color:#0B63E5;">Need help?</h3>

          <p style="font-size:15px; line-height:1.6; margin:0 0 22px;">
            If you face any issues during login or account setup, our support team is here to assist you.
          </p>

          <p style="font-size:15px; margin:0; text-align: center;">
            Thank you for choosing <strong>UniDesk</strong>.  
            <br/>We’re thrilled to partner with your institution!
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

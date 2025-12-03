export const getSchoolCreationEmailTemplate = (
  name: string,
  email: string,
  phone: string,
  address: string,
  short_name?: string,
  website?: string,
  established?: Date,
  logo_url?: string,
  banner_url?: string,
) => {
  const unideskLogoUrl =
    'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return `
   <!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif; color:#333;">
    
    <!-- Outer Container -->
    <div style="width:100%; padding:40px 0;">

      <!-- Main Card -->
      <div style="max-width:650px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- UniDesk Header -->
        <div style="background:#1A73E8; padding:24px; text-align:center;">
          <img src=${unideskLogoUrl}
               alt="UniDesk Logo"
               style="height:48px;">
        </div>

        <!-- School Banner (If Exists) -->
        ${
          banner_url
            ? `<div>
          <img src="${banner_url}" alt="School Banner" style="width:100%; max-height:240px; object-fit:cover;">
        </div>`
            : ''
        }

        <!-- Spacing -->
        <div style="padding:32px 28px;">

          <!-- School Logo (If Exists) -->
          ${
            logo_url
              ? `<div style="text-align:center; margin-bottom:24px;">
            <img src="${logo_url}" alt="School Logo"
                  style="max-height:100px; max-width:180px; object-fit:contain;">
          </div>`
              : ''
          }

          <!-- Welcome Text -->
          <h2 style="color:#1A73E8; margin:0 0 12px; font-size:26px; text-align:center;">
            Welcome to UniDesk 🎉
          </h2>

          <p style="font-size:15px; line-height:1.6; text-align:center; margin:0 0 24px;">
            We’re excited to let you know that your school has been successfully created on the 
            <strong>UniDesk School Management Platform</strong>. Below are your registered school details.
          </p>

          <!-- School Info Card -->
          <div style="background:#f8fafc; border:1px solid #e3e8ee; padding:20px 24px; border-radius:10px;">
            <h3 style="margin:0 0 12px; color:#333; font-size:18px;">School Information</h3>

            <table style="width:100%; font-size:15px; border-collapse:collapse;">
              <tbody>

                <tr>
                  <td style="padding:6px 0; font-weight:bold;">School Name:</td>
                  <td style="padding:6px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0; font-weight:bold;">School Code:</td>
                  <td style="padding:6px 0;">${short_name}</td>
                </tr>

                <tr>
                  <td style="padding:6px 0; font-weight:bold;">Address:</td>
                  <td style="padding:6px 0;">${address}</td>
                </tr>

                <tr>
                  <td style="padding:6px 0; font-weight:bold;">Email:</td>
                  <td style="padding:6px 0;">${email}</td>
                </tr>

                <tr>
                  <td style="padding:6px 0; font-weight:bold;">Phone:</td>
                  <td style="padding:6px 0;">${phone}</td>
                </tr>

                ${
                  website
                    ? `<tr>
                  <td style="padding:6px 0; font-weight:bold;">Website:</td>
                  <td style="padding:6px 0;">${website}</td>
                </tr>`
                    : ''
                }

                ${
                  established
                    ? `<tr>
                  <td style="padding:6px 0; font-weight:bold;">Established:</td>
                  <td style="padding:6px 0;">${new Date(
                    established,
                  ).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}</td>
                </tr>`
                    : ''
                }

              </tbody>
            </table>
          </div>

          <!-- Next Steps -->
          <h3 style="margin:28px 0 12px; color:#1A73E8; font-size:20px;">What happens next?</h3>

          <ul style="font-size:15px; line-height:1.7; padding-left:18px; margin:0;">
            <li>Set up school academic years, classes, and sections.</li>
            <li>Add staff members and student profiles.</li>
            <li>Upload your school logo & banner (if not already done).</li>
            <li>Configure modules such as Attendance, Fees, Exams, Timetable, etc.</li>
            <li>Invite teachers, parents, and non-teaching staff.</li>
          </ul>

          <h3 style="margin:28px 0 12px; color:#1A73E8; font-size:20px;">Need assistance?</h3>

          <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
            Our team is always ready to support you. If you need help with onboarding, setup, 
            or customization, feel free to reach out anytime.
          </p>

          <p style="font-size:15px; margin:0; text-align: center;">
            Thank you for choosing <strong>UniDesk</strong>.  
            <br/>We’re thrilled to partner with your institution!
          </p>

        </div>

      </div>

      <!-- Footer -->
      <div style="text-align:center; margin-top:16px; font-size:12px; color:#777;">
        © 2025 UniDesk · School Management Platform
      </div>

    </div>
  </body>
</html>

    `;
};

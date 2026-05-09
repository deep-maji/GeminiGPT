export function genarateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function getOptHTML(otp) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your OTP Code</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td>
        <table align="center" width="400" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px; text-align:center;">
          
          <tr>
            <td>
              <h2 style="color:#333;">Verification Code</h2>
              <p style="color:#555;">Use the following OTP to complete your verification:</p>
            </td>
          </tr>

          <tr>
            <td>
              <div style="font-size:28px; font-weight:bold; letter-spacing:5px; color:#2d89ef; margin:20px 0;">
                ${otp}
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <p style="color:#777; font-size:14px;">
                This code will expire in 5 minutes.<br>
                If you didn't request this, please ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}


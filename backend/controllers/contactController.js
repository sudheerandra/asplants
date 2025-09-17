import nodemailer from "nodemailer";

//------ CONTACT FORM FORM FRONTEND ----------------
const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

     console.log("🚀 Using SMTP_USER:", process.env.SMTP_USER);

    // 1️⃣ Transporter (works with Gmail App Password OR SMTP key from provider)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or smtp-relay.brevo.com, smtp.sendgrid.net, etc.
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });



    // 2️⃣ Email to YOU (the business owner)
    const mailOptionsToOwner = {
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `🌱 New Contact Form Submission from ${name}`,
      text: `You got a new message from AS Plants contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptionsToOwner);

    // 3️⃣ Auto-reply to CUSTOMER
    const mailOptionsToCustomer = {
      from: process.env.RECEIVER_EMAIL, // your business email
      to: email, // customer's email
      subject: "🌿 Thanks for contacting AS Plants!",
      text: `Hello ${name},\n\nThank you for reaching out to AS Plants 🌱.\n\nWe’ve received your message and our team will get back to you within 24 hours.\n\nYour Message:\n"${message}"\n\n✨ Meanwhile, feel free to explore our latest collection of plants.\n\nWith love & greenery,\nAS Plants Team`,
    };

    await transporter.sendMail(mailOptionsToCustomer);

    res.json({
      success: true,
      msg: "Message sent successfully & auto-reply delivered!",
    });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

//--------- AUTO REPLAY --------------------------
const sendContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
   console.log("🚀 Using SMTP_USER:", process.env.SMTP_USER);

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // 1️⃣ Send notification to AS Plants owner
    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `🌱 New Contact Form Submission from ${name}`,
      html: `
        <h3>📩 New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p style="background:#f9f9f9;padding:10px;border-radius:5px;">${message}</p><br><br>
     <p>
  <span style="color:#228B22; font-style:italic; font-size:16px;">
    With love &amp; greenery,
  </span>
  <br>
  <span style="color:#2E8B57; font-family:'Brush Script MT', cursive; font-size:18px;">
    AS Plants Team
  </span>
</p>
      `,
    });

    // 2️⃣ Send auto-reply to customer
    await transporter.sendMail({
      from: process.env.RECEIVER_EMAIL,
      to: email,
      subject: "🌿 Thanks for contacting AS Plants!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #2e2e2e; padding: 20px;">
          <h2 style="color: #228B22;">🌱 Thank You for Contacting AS Plants!</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>We’ve received your message and will get back to you within <b>24 hours</b>.</p>
          <blockquote style="border-left: 4px solid #4CAF50; margin: 20px 0; padding-left: 10px; color: #555;">
            "${message}"
          </blockquote>
          <p>✨ Meanwhile, explore our latest plant collections.</p><br><br>
<p>
  <span style="color:#228B22; font-style:italic; font-size:16px;">
    With love &amp; greenery,
  </span><br>
  <span style="color:#2E8B57; font-family:'Comic Sans MS', cursive; font-size:18px;">
    AS Plants Team
  </span>
</p>
        </div>
      `,
    });

    res.json({ success: true, msg: "Message sent & auto-reply delivered!" });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { contact, sendContactForm };

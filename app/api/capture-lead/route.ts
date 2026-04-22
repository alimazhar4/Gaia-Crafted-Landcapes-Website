import nodemailer from "nodemailer";

import {
  escapeHtml,
  FormValidationError,
  formatJourneyStage,
  formatProjectType,
  parseSubmittedFormData,
} from "@/lib/garden-enquiry";
import { syncGardenEnquiryToJobber } from "@/lib/jobber";

export async function POST(request: Request) {
  try {
    const formData = parseSubmittedFormData(await request.json());
    const mailPort = parseInt(process.env.MAIL_PORT || "465", 10);
    const rejectUnauthorized = parseBooleanEnv(
      process.env.MAIL_TLS_REJECT_UNAUTHORIZED,
      true,
    );

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized,
      },
    });

    const safeName = escapeHtml(formData.name);
    const safeEmail = escapeHtml(formData.email);
    const safePhone = escapeHtml(formData.phone);
    const safeAddress = escapeHtml(formData.address);
    const safePostcode = escapeHtml(formData.postcode);
    const projectTypeLabel = formatProjectType(formData.projectType);
    const journeyStageLabel = formatJourneyStage(formData.journeyStage);

    const businessEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Garden Enquiry</title>
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #2a1925; border-radius: 20px; overflow: hidden; }
          .header { background: #41273b; padding: 40px 30px; text-align: center; }
          .logo { background-color: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 20px; }
          .logo img { max-width: 200px; height: auto; }
          .title { color: white; font-size: 28px; font-weight: 600; margin: 0; }
          .subtitle { color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0; }
          .content { padding: 40px 30px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 20px; font-weight: 600; color: #41273b; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #ae8420; }
          .info-grid { display: table; width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-row { display: table-row; }
          .info-label { display: table-cell; padding: 12px 15px; background-color: #c5d0c6; font-weight: 600; color: #41273b; width: 30%; border: 1px solid #94a595; }
          .info-value { display: table-cell; padding: 12px 15px; background-color: white; border: 1px solid #e9ecef; font-weight: 600; }
          .qa-section { background-color: #c5d0c6; border-radius: 8px; padding: 25px; margin: 20px 0; }
          .question { font-weight: 600; color: #41273b; font-size: 16px; margin-bottom: 8px; }
          .answer { color: #000000; font-size: 15px; line-height: 1.5; }
          .footer { background-color: #41273b; color: white; padding: 30px; text-align: center; }
          .footer-text { margin: 0; font-size: 14px; opacity: 0.9; }
          .footer-brand { color: #ae8420; font-weight: 600; font-size: 24px; }
          .highlight { background-color: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="https://lp.gaiacraftedlandscapes.co.uk/Logo%20(2).png" alt="Gaia Crafted Landscapes" />
            </div>
            <h1 class="title">New Garden Enquiry Received</h1>
            <p class="subtitle">A potential client has submitted their garden project details</p>
          </div>

          <div class="content">
            <div class="section">
              <h2 class="section-title">Customer Information</h2>
              <div class="info-grid">
                <div class="info-row">
                  <div class="info-label">Full Name</div>
                  <div class="info-value">${safeName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${safeEmail}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">${safePhone}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Address</div>
                  <div class="info-value">${safeAddress}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Postcode</div>
                  <div class="info-value">${safePostcode}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h2 class="section-title">Project Details</h2>
              <div class="qa-section">
                <div style="margin-bottom: 20px;">
                  <div class="question">What type of garden project are they interested in?</div>
                  <div class="answer">${escapeHtml(projectTypeLabel)}</div>
                </div>
                <div style="margin-bottom: 20px;">
                  <div class="question">Where are they in their garden renovation journey?</div>
                  <div class="answer">${escapeHtml(journeyStageLabel)}</div>
                </div>
              </div>
            </div>

            <div class="highlight">
              <strong>Next Steps:</strong> Please contact ${safeName} within 2 working days to discuss their garden project requirements and schedule a consultation.
            </div>
          </div>

          <div class="footer">
            <p class="footer-text">
              This enquiry was submitted via the Gaia Crafted Landscapes website<br>
              <span class="footer-brand">Gaia Crafted Landscapes</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Garden Enquiry: ${formData.name} - ${projectTypeLabel}`,
      html: businessEmailContent,
    });

    const customerEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Garden Enquiry</title>
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 3px solid #2a1925; border-radius: 20px; overflow: hidden; }
          .header { background: #41273b; padding: 40px 30px; text-align: center; }
          .logo { background-color: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 20px; }
          .logo img { max-width: 200px; height: auto; }
          .title { color: white; font-size: 28px; font-weight: 600; margin: 0; }
          .subtitle { color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0; }
          .content { padding: 40px 30px; }
          .welcome-text { font-size: 18px; line-height: 1.6; color: #495057; margin-bottom: 15px; }
          .greeting { font-size: 18px; line-height: 1.6; color: #495057; margin-bottom: 5px; }
          .highlight-box { background-color: #c5d0c6; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #ae8420; }
          .highlight-title { color: #41273b; font-size: 20px; font-weight: 600; margin-bottom: 15px; }
          .highlight-text { color: #000000; line-height: 1.6; margin: 0; font-size: 16px; }
          .contact-info { background-color: #c5d0c6; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; }
          .contact-title { color: #41273b; font-weight: 600; margin-bottom: 10px; }
          .contact-text { color: #495057; margin: 5px 0; }
          .footer { background-color: #41273b; color: white; padding: 30px; text-align: center; }
          .footer-text { margin: 0; font-size: 14px; opacity: 0.9; }
          .footer-brand { color: #ae8420; font-weight: 600; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="https://lp.gaiacraftedlandscapes.co.uk/Logo%20(2).png" alt="Gaia Crafted Landscapes" />
            </div>
            <h1 class="title">Thank You for Your Enquiry</h1>
            <p class="subtitle">We're excited to help bring your garden vision to life</p>
          </div>

          <div class="content">
            <p class="greeting">
              Dear ${safeName},
            </p>

            <p class="welcome-text">
              Thank you for reaching out to Gaia Crafted Landscapes. We've received your garden enquiry and are delighted to hear about your project!
            </p>

            <div class="highlight-box">
              <div class="highlight-title">What's Next?</div>
              <div class="highlight-text">
                One of our experienced garden design specialists will be in touch within the next 2 working days to discuss your requirements and arrange a convenient time for an initial consultation.
              </div>
            </div>

            <div class="contact-info">
              <div class="contact-title">Questions? We're here to help!</div>
              <div class="contact-text">Email: hello@gaiacraftedlandscapes.co.uk</div>
            </div>

            <p style="color: #6c757d; font-size: 14px; line-height: 1.5; text-align: center;">
              We look forward to working with you to create the beautiful garden space you've always dreamed of.
            </p>
          </div>

          <div class="footer">
            <p class="footer-text">
              <span class="footer-brand">Gaia Crafted Landscapes</span><br>
              Bespoke Garden Design & Build Across South Wales
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: formData.email,
      subject: "Thank You for Your Garden Enquiry - Gaia Crafted Landscapes",
      html: customerEmailContent,
    });

    let jobberResult: Awaited<
      ReturnType<typeof syncGardenEnquiryToJobber>
    > | null = null;

    try {
      jobberResult = await syncGardenEnquiryToJobber(formData);
      if (jobberResult.warnings.length) {
        console.warn(
          "Jobber sync completed with warnings:",
          jobberResult.warnings,
        );
      }
    } catch (error) {
      console.error("Jobber sync failed:", error);
    }

    return Response.json({
      success: true,
      message: "Enquiry submitted successfully",
      jobber: jobberResult
        ? {
            action: jobberResult.action,
            warnings: jobberResult.warnings,
          }
        : undefined,
    });
  } catch (error) {
    if (error instanceof FormValidationError) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    console.error("Error submitting enquiry:", error);

    return Response.json(
      {
        success: false,
        message: "Error submitting enquiry",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

function parseBooleanEnv(
  value: string | undefined,
  defaultValue: boolean,
): boolean {
  if (!value) {
    return defaultValue;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

import nodemailer from 'nodemailer';
import { SubmittedFormData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const formData: SubmittedFormData = await request.json();

    // Create transporter using SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: parseInt(process.env.MAIL_PORT || '465'),
      secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Email to Gaia Crafted Landscapes
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
          <!-- Header -->
          <div class="header">
            <div class="logo">
              <img src="${process.env.NEXT_PUBLIC_BASE_URL}/Logo%20(2).png" alt="Gaia Crafted Landscapes" />
            </div>
            <h1 class="title">New Garden Enquiry Received</h1>
            <p class="subtitle">A potential client has submitted their garden project details</p>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Customer Information -->
            <div class="section">
              <h2 class="section-title">Customer Information</h2>
              <div class="info-grid">
                <div class="info-row">
                  <div class="info-label">Full Name</div>
                  <div class="info-value">${formData.name}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${formData.email}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">${formData.phone}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Postcode</div>
                  <div class="info-value">${formData.postcode}</div>
                </div>
              </div>
            </div>

            <!-- Project Details -->
            <div class="section">
              <h2 class="section-title">Project Details</h2>
              <div class="qa-section">
                <div style="margin-bottom: 20px;">
                  <div class="question">What type of garden project are they interested in?</div>
                  <div class="answer">${formatProjectType(formData.projectType)}</div>
                </div>
                <div style="margin-bottom: 20px;">
                  <div class="question">Where are they in their garden renovation journey?</div>
                  <div class="answer">${formatJourneyStage(formData.journeyStage)}</div>
                </div>
              </div>
            </div>

            <!-- Action Items -->
            <div class="highlight">
              <strong>Next Steps:</strong> Please contact ${formData.name} within 24 hours to discuss their garden project requirements and schedule a consultation.
            </div>
          </div>

          <!-- Footer -->
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

    // Send email to business
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Garden Enquiry: ${formData.name} - ${formatProjectType(formData.projectType)}`,
      html: businessEmailContent,
    });

    // Send confirmation email to customer
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
          .steps { margin: 30px 0; }
          .step { display: flex; align-items: flex-start; margin-bottom: 20px; }
          .step-number { background-color: #ae8420; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 15px; flex-shrink: 0; }
          .step-content { flex: 1; }
          .step-title { font-weight: 600; color: #41273b; margin-bottom: 5px; }
          .step-description { color: #6c757d; line-height: 1.5; }
          .contact-info { background-color: #c5d0c6; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; }
          .contact-title { color: #41273b; font-weight: 600; margin-bottom: 10px; }
          .contact-text { color: #495057; margin: 5px 0; }
          .footer { background-color: #41273b; color: white; padding: 30px; text-align: center; }
          .footer-text { margin: 0; font-size: 14px; opacity: 0.9; }
          .footer-brand { color: #ae8420; font-weight: 600; font-size: 24px; }
          .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
          .signature-name { font-weight: 600; margin-bottom: 5px; }
          .signature-title { opacity: 0.8; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">
              <img src="${process.env.NEXT_PUBLIC_BASE_URL}/Logo%20(2).png" alt="Gaia Crafted Landscapes" />
            </div>
            <h1 class="title">Thank You for Your Enquiry</h1>
            <p class="subtitle">We're excited to help bring your garden vision to life</p>
          </div>

          <!-- Content -->
          <div class="content">
            <p class="greeting">
              Dear ${formData.name},
            </p>

            <p class="welcome-text">
              Thank you for reaching out to Gaia Crafted Landscapes. We've received your garden enquiry and are delighted to hear about your project!
            </p>

            <div class="highlight-box">
              <div class="highlight-title">What's Next?</div>
              <div class="highlight-text">
                One of our experienced garden design specialists will be in touch within the next 24 hours to discuss your requirements and arrange a convenient time for an initial consultation.
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

          <!-- Footer -->
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
      subject: 'Thank You for Your Garden Enquiry - Gaia Crafted Landscapes',
      html: customerEmailContent,
    });

    return Response.json({
      success: true,
      message: 'Enquiry submitted successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      {
        success: false,
        message: 'Error submitting enquiry',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function formatProjectType(type: string): string {
  const projectMap: Record<string, string> = {
    'full-landscaping': 'Full Garden Landscaping',
    'planters-pergolas': 'Planters & Pergolas',
    'garden-design': 'Garden Design Service',
    'patio-paving': 'Patio or Paving',
    'fencing': 'Fencing',
    'driveway': 'Driveway',
    'garden-room': 'Garden Room',
  };
  return projectMap[type] || type;
}

function formatJourneyStage(stage: string): string {
  const journeyMap: Record<string, string> = {
    'planning': "I'm still planning and researching",
    'only-quote': "This is the only quote I'm getting",
    'multiple-quotes': "I've already received a few quotes",
    'ready': "I'm ready to get started",
  };
  return journeyMap[stage] || stage;
}

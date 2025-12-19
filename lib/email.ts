import sgMail from '@sendgrid/mail'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@freightthis.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@freightthis.com'

// Send email notification when a new job is posted
export async function sendJobPostedEmail(jobData: {
  title: string
  companyName?: string
  location: string
  contactEmail: string
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email')
    return
  }

  const msg = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `New Job Posted: ${jobData.title}`,
    text: `A new job has been posted and is awaiting approval.\n\nJob Title: ${jobData.title}\nCompany: ${jobData.companyName || 'N/A'}\nLocation: ${jobData.location}\nContact: ${jobData.contactEmail}`,
    html: `
      <h2>New Job Posted</h2>
      <p>A new job has been posted and is awaiting approval.</p>
      <ul>
        <li><strong>Job Title:</strong> ${jobData.title}</li>
        <li><strong>Company:</strong> ${jobData.companyName || 'N/A'}</li>
        <li><strong>Location:</strong> ${jobData.location}</li>
        <li><strong>Contact:</strong> ${jobData.contactEmail}</li>
      </ul>
      <p>Please review and approve in the admin dashboard.</p>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log('Job posted email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Send email when job is approved
export async function sendJobApprovedEmail(jobData: {
  title: string
  contactEmail: string
  jobUrl: string
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email')
    return
  }

  const msg = {
    to: jobData.contactEmail,
    from: FROM_EMAIL,
    subject: `Your Job Posting Has Been Approved`,
    text: `Your job posting "${jobData.title}" has been approved and is now live!\n\nView it here: ${jobData.jobUrl}`,
    html: `
      <h2>Job Approved!</h2>
      <p>Your job posting <strong>"${jobData.title}"</strong> has been approved and is now live!</p>
      <p><a href="${jobData.jobUrl}">View your job posting</a></p>
    `,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Send email when application is received
export async function sendApplicationReceivedEmail(applicationData: {
  jobTitle: string
  applicantName: string
  applicantEmail: string
  message: string
  jobContactEmail: string
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email')
    return
  }

  const msg = {
    to: applicationData.jobContactEmail,
    from: FROM_EMAIL,
    subject: `New Application for ${applicationData.jobTitle}`,
    text: `You have received a new application for your job posting "${applicationData.jobTitle}".\n\nApplicant: ${applicationData.applicantName}\nEmail: ${applicationData.applicantEmail}\nMessage: ${applicationData.message}`,
    html: `
      <h2>New Application Received</h2>
      <p>You have received a new application for your job posting <strong>"${applicationData.jobTitle}"</strong>.</p>
      <ul>
        <li><strong>Applicant:</strong> ${applicationData.applicantName}</li>
        <li><strong>Email:</strong> ${applicationData.applicantEmail}</li>
        <li><strong>Message:</strong> ${applicationData.message}</li>
      </ul>
      <p>Please check your admin dashboard to review the full application and resume.</p>
    `,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Send confirmation email to applicant
export async function sendApplicationConfirmationEmail(applicationData: {
  jobTitle: string
  applicantName: string
  applicantEmail: string
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email')
    return
  }

  const msg = {
    to: applicationData.applicantEmail,
    from: FROM_EMAIL,
    subject: `Application Received for ${applicationData.jobTitle}`,
    text: `Thank you for applying to ${applicationData.jobTitle}. Your application has been received and will be reviewed shortly.`,
    html: `
      <h2>Application Received</h2>
      <p>Thank you for applying to <strong>${applicationData.jobTitle}</strong>.</p>
      <p>Your application has been received and will be reviewed shortly. The hiring team will contact you if your profile matches their requirements.</p>
      <p>Good luck!</p>
    `,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Send solution request to the provided contact email (plain-text)
export async function sendSolutionRequestEmail(payload: {
  toEmail: string
  type: string
  selectedItems: string[]
  otherText?: string
  contact: { fullName?: string; companyName?: string; email?: string; phone?: string }
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email')
    return
  }

  const { toEmail, type, selectedItems, otherText, contact } = payload

  const textParts = [
    `Type: ${type}`,
    `Selected Items:\n${selectedItems.length ? selectedItems.join('\n') : 'None'}`,
    `Other: ${otherText || 'N/A'}`,
    'Contact Details:',
    `Name: ${contact.fullName || 'N/A'}`,
    `Company: ${contact.companyName || 'N/A'}`,
    `Email: ${contact.email || 'N/A'}`,
    `Phone: ${contact.phone || 'N/A'}`,
  ]

  const msg = {
    to: toEmail,
    from: FROM_EMAIL,
    subject: `Solution Request (${type})`,
    text: textParts.join('\n\n'),
  }

  try {
    await sgMail.send(msg)
    console.log('Solution request email sent to', toEmail)
  } catch (error) {
    console.error('Error sending solution request email:', error)
    throw error
  }
}

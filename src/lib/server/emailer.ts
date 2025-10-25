import { Resend } from 'resend';
import sanitizeHtml from 'sanitize-html';
import { env } from '$env/dynamic/private';

const notificationsAddress = 'notifications@oslorollerderby.com';
var notificationEmailer: Resend | null = null;

export async function sendAccessRequest(userId: string, name: string | null, context: string) {
  const sanitizedName = name ? sanitizeHtml(name) : '(no name)';
  await sendNotification(
    `Access request for user ${userId}`,
    `<p>User ${userId} (${sanitizedName}) is requesting access on page ${context}.</p>`,
  );
}

export async function sendFeedbackNotification(context: string, text: string, contact: string | undefined) {
  await sendNotification(
      `Feedback submitted on '${context}'`,
      `<p>Contact: ${contact?.length ? contact! : '(none)'}</p><p>${sanitizeHtml(text)}</p>`
  );
}

export async function sendNumberRequestNotification(name: string, number: string, contact: string) {
  const sanitizedName = sanitizeHtml(name);
  await sendNotification(
      `Number request submitted for '${number} ${sanitizedName}'`,
      `<p>Contact: ${sanitizeHtml(contact)}</p><p>Name: ${sanitizedName}</p><p>Number: ${number}</p>`
  );
}

async function sendNotification(subject: string, html: string) {
  try {
    const { error } = await getNotificationEmailer().emails.send(
        {
          from: notificationsAddress,
          to: [env.NOTIFICATION_RECIPIENT],
          subject,
          html,
        }
    );

    if (error) {
      throw new Error(`Resend error: ${error}`);
    }
  } catch (error) {
    throw new Error(`Resend error: ${error}`);
  }
}

function getNotificationEmailer() {
  if (notificationEmailer == null) {
    notificationEmailer = new Resend(env.RESEND_API_KEY);
  }
  return notificationEmailer;
}

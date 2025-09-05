export async function submitFeedback(data: FormData) {
  const contact = data.get('contact')?.toString();
  const context = data.get('context')?.toString();
  const text = data.get('text')?.toString();

  console.log(`contact: ${contact}, context: ${context}, text: ${text}`);
  return { success: true };
};

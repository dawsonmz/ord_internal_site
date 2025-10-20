import { fail } from "@sveltejs/kit";
import { sendNumberRequestNotification } from "$lib/server/emailer";
import { InternalError } from "$lib/server/errors";
import type { WrappedRequest } from "$lib/server/request";
import { sanityClient } from "$lib/server/sanity";

interface SkaterNumber {
  skater_number: String,
  derby_name: String,

  // Computed fields:
  derby_name_lower: String,
}

/**
 * @returns All skater numbers and derby names ordered in increasing order by number. Excludes those with temporary names.
 */
export async function loadSkaterVault(): Promise<SkaterNumber[]> {
  const skaterNumberData: SkaterNumber[] = await sanityClient.option.fetch(
    `*[_type == "skater_number" && temporary == false] | order(skater_number asc)`
  );

  if (!skaterNumberData) {
    throw new InternalError("Failed to load skater vault data");
  }

  // For faster search on the skater vault page.
  skaterNumberData.forEach((skaterNumber) => skaterNumber.derby_name_lower = skaterNumber.derby_name.toLowerCase());
  return skaterNumberData;
}

export async function submitNumberRequest(req: WrappedRequest): Promise<any> {
  const data = await req.request.formData();

  const formId = data.get('formId')?.toString();
  const name = data.get('name')?.toString().trim();
  const number = data.get('number')?.toString().trim();
  const contact = data.get('contact')?.toString().trim();

  const errorsBody = {
    name: missingError(name),
    number: numberError(number),
    contact: missingError(contact),
  };

  if (errorsBody.name || errorsBody.number || errorsBody.contact) {
    return fail(400, { errors: errorsBody, formId });
  }

  await sendNumberRequestNotification(name!, number!, contact!);
  return {
    success: true,
    formId,
  };
};

function missingError(field: string | undefined): string | null {
  return field ? null : 'Required field';
}

function numberError(number: string | undefined): string | null {
  if (number && !/^[0-9]+$/.test(number)) {
    return 'Only numbers allowed'
  } else {
    return missingError(number);
  }
}

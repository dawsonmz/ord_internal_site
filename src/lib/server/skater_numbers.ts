import { fail } from "@sveltejs/kit";
import { InternalError } from "$lib/server/errors";
import { createDocument } from "$lib/server/firestore";
import type { WrappedRequest } from "$lib/server/request";
import { sanityClient } from "$lib/server/sanity";

export interface SkaterNumber {
  skater_number: String,
  derby_name: String,

  // Computed fields:
  derby_name_lower: String,
}

/**
 * @returns All skater numbers and derby names ordered in increasing order by number.
 */
export async function loadSkaterNumbers(): Promise<SkaterNumber[]> {
  const skaterNumberData: SkaterNumber[] = await sanityClient.option.fetch(`*[_type == "skater_number"] | order(skater_number asc)`);
  if (!skaterNumberData) {
    throw new InternalError("Failed to load training plan data.");
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

  if (number && !/^[0-9]+$/.test(number)) {
    return fail(
      400,
      {
        errors: {
          number: 'Number can only contain digits.',
        },
        formId,
      },
    );
  }

  const body = {
    fields: {
      name: { stringValue: name },
      number: { stringValue: number },
      contact: { stringValue: contact },
    },
  };

  await createDocument('number-request', body);
  return {
    success: true,
    formId,
  };
};

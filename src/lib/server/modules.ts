import { toHTML } from "@portabletext/to-html";
import { InternalError } from "$lib/server/errors";
import { type ModuleCategory, type ModuleCategoryRef, loadModuleCategories } from "$lib/server/module_categories";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Module {
  _id: String,
  _createdAt: String,
  name: String,
  title: String,
  category: ModuleCategoryRef,
  minutes: Number,
  short_text: [],
  detailed_text: [],

  // Computed fields:
  module_category: ModuleCategory,
  start_time: String,
  short_text_html: String,
  detailed_text_html: String,
}

export interface ModuleRef {
  _ref: String,
}

export async function loadModules(): Promise<Module[]> {
  const [moduleCategoryData, moduleData] = await Promise.all(
      [
        loadModuleCategories(),
        await sanityClientCredentials.option.fetch(`*[_type == "module"] | order(_createdAt asc)`),
      ]
  );
  if (!moduleCategoryData || !moduleData) {
    throw new InternalError("Failed to load module data.");
  }

  const moduleCategoriesById = new Map<String, ModuleCategory>();
  moduleCategoryData.forEach(
      (moduleCategory: ModuleCategory) => {
        moduleCategoriesById.set(moduleCategory._id, moduleCategory);
      }
  );

  moduleData.forEach(
      (module: Module) => {
        module.module_category = moduleCategoriesById.get(module.category._ref)!;
        module.short_text_html = toHTML(module.short_text).replaceAll('<p></p>', '<br />');
        if (module.detailed_text) {
          module.detailed_text_html = toHTML(module.detailed_text).replaceAll('<p></p>', '<br />');
        }
      }
  );
  return moduleData;
}

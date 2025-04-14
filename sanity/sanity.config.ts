import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ORD',

  projectId: 'vh55mhjn',
  dataset: 'production_private',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

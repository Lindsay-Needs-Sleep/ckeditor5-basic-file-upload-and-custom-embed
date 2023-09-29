/**
 * repackages plugin so that it is exported as default as well
 */

import { FileUploadAndCustomEmbed } from './src/index.js';
import FIELD_TYPES from './src/field-types.js';

export { FileUploadAndCustomEmbed, FIELD_TYPES };

export default FileUploadAndCustomEmbed;

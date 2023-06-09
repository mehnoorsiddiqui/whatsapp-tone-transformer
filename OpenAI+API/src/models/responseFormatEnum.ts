/**
 * OpenAI APILib
 *
 * This file was automatically generated by APIMATIC v3.0 ( https://www.apimatic.io ).
 */

import { Schema, stringEnum } from '../schema';

/**
 * Enum for ResponseFormatEnum
 */
export enum ResponseFormatEnum {
  Url = 'url',
  B64Json = 'b64_json',
}

/**
 * Schema for ResponseFormatEnum
 */
export const responseFormatEnumSchema: Schema<ResponseFormatEnum> = stringEnum(ResponseFormatEnum);

/**
 * WhatsApp Cloud APILib
 *
 * This file was automatically generated by APIMATIC v3.0 ( https://www.apimatic.io ).
 */

import { Schema, stringEnum } from '../schema';

/**
 * Enum for ButtonParameterTypeEnum
 */
export enum ButtonParameterTypeEnum {
  Payload = 'payload',
  Text = 'text',
}

/**
 * Schema for ButtonParameterTypeEnum
 */
export const buttonParameterTypeEnumSchema: Schema<ButtonParameterTypeEnum> = stringEnum(ButtonParameterTypeEnum);
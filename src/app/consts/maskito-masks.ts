import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

export const PHONE_MASK: MaskitoOptions = {
    mask: ['+', '5', '5', ' ', '(', /\d/, /\d/, ')', ' ', ...Array(5).fill(/\d/), '-', ...Array(4).fill(/\d/)],
}
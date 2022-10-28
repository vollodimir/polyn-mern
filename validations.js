import { body } from 'express-validator';

export const registerValidation = [
  body('firstName', 'Фамілія має бути довше').isLength({ min: 3 }),
  body('lastName', 'Ім"я має бути довше').isLength({ min: 3 }),
  body('email', 'Перевірте електронну скриньку').isEmail(),
  body('password', 'Недопустимий пароль').isLength({ min: 5 }),
];

export const loginValidation = [
  body('email', 'Перевірте електронну скриньку').isEmail(),
  body('password', 'Недопустимий пароль').isLength({ min: 5 }),
];

export const PostValidation = [
  body('title', 'Довжина 5-50 символів').isLength({ min: 5 }).isString(),
  body('text', 'Довжина 300 символів').isLength({ min: 5 }).isString(),
  body('imgURL', 'imgURL').optional().isString(),
  body('tags', 'tags').isArray(),
];

export const ProductValidation = [
  body('title', 'Довжина 5-50 символів').isLength({ min: 5, max: 50 }),
  body('description', 'Довжина 15-400 символів').isLength({ min: 5 }),
  body('text', 'Довжина 300 символів').isLength({ min: 5 }),
  body('tags', 'Err tags').isArray(),
  body('imgURL', 'Err imgURL').optional(),
  body('videoURL', 'Err videoURL').optional(),
  body('availability', 'Err availability').isBoolean(),
  body('sizes', 'Err sizes').isArray(),
  body('colors', 'Err colors').optional().isArray(),
  body('price', 'Err price').notEmpty(),
  body('priceFactor', 'Err priceFactor').notEmpty(),
  body('sale', 'Err sale').notEmpty(),
];

export const CategoryValidation = [
  body('name', 'Довжина від 3 символів').isLength({ min: 3 }).isString(),
  body('description', 'description err').optional().isString(),
];

export const SubCategoryValidation = [
  body('name', 'Довжина від 3 символів').isLength({ min: 3 }).isString(),
];

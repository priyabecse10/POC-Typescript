// import { Op } from 'sequelize';
// //import { USER_ROLE } from '../../config/constants';
// //import { Organization } from '..';

// import { UserInstance, UserStatic } from '../../types';

// export function isEmailUnique(
//   this: UserInstance,
//   email: string,
//   next: (err?: string) => void
// ) {
//   if (email) {
//     const model = this.constructor as UserStatic;
//     model
//       .findOne({ where: { email: { [Op.iLike]: email } } })
//       .then((result: UserInstance | null) => {
//         if (result) {
//           return next('Email id should be unique');
//         }
//         return next();
//       })
//       .catch(() => next());
//   } else {
//     next();
//   }
// }

// export function isValidPassword(
//   this: UserInstance,
//   password: Text,
//   next: (err?: string) => void
// ) {
//   if (password) {
//     if (password !== this.password_confirmation) {
//       return next("Password confirmation doesn't match Password");
//     }
//   }
//   next();
// }

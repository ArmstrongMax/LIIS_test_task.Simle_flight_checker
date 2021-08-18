import * as Yup from 'yup'
//Validation scheme for handling specific aspects of validation for each field using Yup
export const LoginSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, 'Слишком короткий')
        .matches(/^[^@]+@[^@.]+\.[^@]+$/, 'Некорректный почтовый адрес')
        .required('Обязательное поле'),

    password: Yup.string()
        .min(2, 'Слишком короткий')
        .required('Обязательное поле')
        .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, 'Только латиница, минимум: 8 знаков, 1 заглавная буква, 1 цифра')
});
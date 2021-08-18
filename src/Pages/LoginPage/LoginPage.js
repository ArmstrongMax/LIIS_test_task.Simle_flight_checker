import React from "react";
import styles from './LoginPage.module.css'
import {LoginSchema} from '../../Validation/Validation';
import {Field, Form, Formik} from "formik";
import errorStyles from '../../CommonStyles/ErrorMessage.module.css'
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {Redirect} from "react-router";

/*Using Formik for forms and validation,
useDispatch and useSelect for taking data from the store.
There is a redirect in the case of an already authorized user.*/

const LoginPage = () => {
    const dispatch = useDispatch()
    const loginErrorMessage = useSelector(state => state.auth.errorMessage)
    const isSomeoneAuthorized = useSelector(store => store.auth.isSomeoneAuthorized)

    if (isSomeoneAuthorized) return <Redirect to={'/flights'}/>

    return <div className={styles.loginPageContainer}>
        <div className={styles.blur}>
            <div className={styles.loginFormContainer}>
                <Formik
                    initialValues={{login: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        dispatch({type: 'LOGIN_REQUEST', payload: values})
                    }}>
                    {({errors, touched}) => (
                        <Form>
                            <div className={styles.loginForm}>
                                <div className={styles.titleField}>
                                    <h1>Simple Flight Check</h1>
                                </div>
                                <div className={styles.loginField}>
                                    <label
                                        className={classNames({[errorStyles.errorLabel]: errors.login && touched.login})}
                                        htmlFor="login">
                                        Почта:
                                    </label>
                                    <Field
                                        className={classNames(styles.formControl, {[errorStyles.errorFormBorder]: errors.login && touched.login})}
                                        id="login"
                                        name="login"
                                        placeholder="Электронный адрес"/>
                                    {errors.login && touched.login ? (
                                        <div className={errorStyles.errorMessage}>{errors.login}</div>
                                    ) : null}
                                </div>
                                <div className={styles.passwordField}>
                                    <label
                                        className={classNames({[errorStyles.errorLabel]: errors.password && touched.password})}
                                        htmlFor="password">
                                        Пароль:
                                    </label>
                                    <Field
                                        className={classNames(styles.formControl, {[errorStyles.errorFormBorder]: errors.password && touched.password})}
                                        id="password"
                                        name="password"
                                        placeholder="Пароль"
                                        type="password"/>
                                    {errors.password && touched.password ? (
                                        <div className={errorStyles.errorMessage}>{errors.password}</div>
                                    ) : null}
                                </div>
                                {loginErrorMessage && <div className={errorStyles.errorMessage}>
                                    {loginErrorMessage}
                                </div>}
                                <div className={styles.submitButtonField}>
                                    <button type="submit" className={styles.submitButton}>Войти</button>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
}
export default LoginPage
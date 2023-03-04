import type { FormikErrors } from 'formik';
import { useFormik } from 'formik';
import type { FC } from 'react';
import { useState } from 'react';
import * as z from 'zod';

import { useSignUp } from '../../../hooks/useSignUp';
import { useCloseModal, useIsOpenModal, useOpenModal } from '../../../store/modal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './SignUpModal.styles';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

// NOTE: 文字列に @ が含まれているか確認する
const emailSchema = z.string().refine((v) => !NOT_INCLUDED_AT_CHAR_REGEX.test(v));
// NOTE: 文字列に英数字以外の文字が含まれているか確認する
const passwordSchema = z.string().refine((v) => !NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(v));

export type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

export const SignUpModal: FC = () => {
  const isOpened = useIsOpenModal('SIGN_UP');
  const { signUp } = useSignUp();

  const handleOpenModal = useOpenModal();
  const handleCloseModal = useCloseModal();

  const [submitError, setSubmitError] = useState<Error | null>(null);
  const formik = useFormik<SignUpForm>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    async onSubmit(values, { resetForm }) {
      try {
        await signUp({
          variables: {
            email: values.email,
            name: values.name,
            password: values.password,
          },
        });
        resetForm();
        setSubmitError(null);
        handleCloseModal();
      } catch (err) {
        setSubmitError(err as Error);
      }
    },
    validate(values) {
      const errors: FormikErrors<SignUpForm> = {};
      if (values.email != '' && !emailSchema.safeParse(values.email).success) {
        errors['email'] = 'メールアドレスの形式が間違っています';
      }
      if (values.password != '' && !passwordSchema.safeParse(values.password).success) {
        errors['password'] = '英数字以外の文字を含めてください';
      }
      return errors;
    },
    validateOnChange: true,
  });

  return (
    <Modal onHide={handleCloseModal} show={isOpened}>
      <div className={styles.inner()}>
        <header className={styles.header()}>
          <h2 className={styles.heading()}>会員登録</h2>
          <button
            className={styles.switchToSignInButton()}
            data-testid="modal-switch-to-signin"
            onClick={() => handleOpenModal('SIGN_IN')}
          >
            ログイン
          </button>
        </header>
        <form className={styles.form()} onSubmit={formik.handleSubmit}>
          <div className={styles.inputList()}>
            <TextInput
              required
              id="email"
              label="メールアドレス"
              onChange={formik.handleChange}
              placeholder="メールアドレスを入力"
              type="email"
              value={formik.values.email}
            />
            <p className={styles.error()}>{formik.errors.email}</p>

            <TextInput
              required
              id="name"
              label="名前"
              onChange={formik.handleChange}
              placeholder="名前を入力"
              type="text"
              value={formik.values.name}
            />
            <p className={styles.error()}>{formik.errors.name}</p>

            <TextInput
              required
              id="password"
              label="パスワード"
              onChange={formik.handleChange}
              placeholder="パスワードを入力"
              type="password"
              value={formik.values.password}
            />
            <p className={styles.error()}>{formik.errors.password}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              登録する
            </PrimaryButton>
          </div>
          {submitError ? <p className={styles.error()}>会員登録に失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};

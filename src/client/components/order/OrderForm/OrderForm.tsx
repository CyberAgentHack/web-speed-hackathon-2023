import { useFormik } from 'formik';
import type { ChangeEventHandler, FC } from 'react';
import zipcodeJa from 'zipcode-ja';

import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './OrderForm.styles';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik<OrderFormValue>({
    initialValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
    onSubmit,
  });

  const handleZipcodeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    formik.handleChange(event);

    const zipCode = event.target.value;
    const address = [...(structuredClone(zipcodeJa)[zipCode]?.address ?? [])];
    const prefecture = address.shift();
    const city = address.join(' ');

    formik.setFieldValue('prefecture', prefecture);
    formik.setFieldValue('city', city);
  };

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={formik.handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleZipcodeChange}
            placeholder="例: 1500042"
            value={formik.values.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={formik.handleChange}
            placeholder="例: 東京都"
            value={formik.values.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={formik.handleChange}
            placeholder="例: 渋谷区宇田川町"
            value={formik.values.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={formik.handleChange}
            placeholder="例: 40番1号 Abema Towers"
            value={formik.values.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

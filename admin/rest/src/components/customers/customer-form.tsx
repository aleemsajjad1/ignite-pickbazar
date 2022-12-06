import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import {
  AttachmentInput,
  ContactDetailsInput,
  Type,
  TypeSettingsInput,
  UserAddressInput,
} from '@/types';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { typeValidationSchema } from './customer-validation-schema';
import FileInput from '@/components/ui/file-input';
import Router from 'next/router';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import TextArea from '@/components/ui/text-area';
import { toast } from 'react-toastify';
import { AddBrands } from '../../services/Service';
import Label from '@/components/ui/label';
import { Controller, useFieldArray } from 'react-hook-form';
import ValidationError from '@/components/ui/form-validation-error';
import { DatePicker } from '@/components/ui/date-picker';

type BannerInput = {
  title: string;
  description: string;
  image: AttachmentInput;
};

type FormValues = {
  fname?: string | null;
  lname?: string | null;
  icon?: any;
  promotional_sliders: AttachmentInput[];
  banners: BannerInput[];
  settings: TypeSettingsInput;
  des: string | null;
  contactDetails: ContactDetailsInput;
  email?: string | null;
  born: string;
  address: UserAddressInput;

};

type IProps = {
  initialValues?: Type | null;
};
export default function CreateOrUpdateTypeForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(typeValidationSchema),
  });

  const onSubmit = (values: FormValues) => {
    console.log('valuesvalues', values);

    AddBrands(values).then((result) => {
      console.log('result===', result);
      if (result.success) {
        toast.success(t('common:successfully-created'));
        Router.push(Routes.brands.list, undefined, {
          locale: Config.defaultLanguage,
        });
      } else {
        toast.error(t('Something Went Wrong'));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-description')}
          details={`${
            initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')
          } ${t('form:type-description-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-Fname')}
            {...register('fname')}
            error={t(errors.fname?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-Lname')}
            {...register('lname')}
            error={t(errors.lname?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <TextArea
            label={t('form:input-description')}
            {...register('des')}
            error={t(errors.des?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5 flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{t('form:input-label-author-dob')}</Label>
              <Controller
                control={control}
                name="born"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    //@ts-ignore
                    selected={value}
                    selectsStart
                    startDate={new Date()}
                    className="border border-border-base"
                  />
                )}
              />
              <ValidationError message={t(errors.born?.message!)} />
            </div>
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label={t('form:input-label-mobileNumber')}
                {...register('contactDetails.contact')}
                variant="outline"
                className="mb-5"
                error={t(errors.contactDetails?.contact?.message!)}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('More Information')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        
        <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-country')}
              {...register('address.country')}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.country?.message!)}
            />
            <Input
              label={t('form:input-label-city')}
              {...register('address.city')}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.city?.message!)}
            />
            <Input
              label={t('form:input-label-state')}
              {...register('address.state')}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.state?.message!)}
            />
            <Input
              label={t('form:input-label-zip')}
              {...register('address.zip')}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.zip?.message!)}
            />
            <TextArea
              label={t('form:input-label-street-address')}
              {...register('address.street_address')}
              variant="outline"
              error={t(errors.address?.street_address?.message!)}
            />
          </Card>
      </div>

      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button>
          {initialValues ? t('form:button-label-update-group') : t('Add Customers')}
        </Button>
      </div>
    </form>
  );
}

import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { AttachmentInput, Type, TypeSettingsInput } from '@/types';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { typeValidationSchema } from './unit-validation-schema';
import FileInput from '@/components/ui/file-input';
import Router from 'next/router';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import TextArea from '@/components/ui/text-area';
import { toast } from 'react-toastify';
import { AddBrands } from '../../services/Service';
import SelectInput from '../ui/select-input';
import { unitDrop } from './unit-icon';
import Label from '../ui/label';

type BannerInput = {
  title: string;
  description: string;
  image: AttachmentInput;
};

type FormValues = {
  name?: string | null;
  icon?: any;
  promotional_sliders: AttachmentInput[];
  banners: BannerInput[];
  settings: TypeSettingsInput;
  des: string | null;
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
          details={t('Add New Unit Description')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Short Name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label>{t('Allow Decimal')}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={unitDrop}
              isClearable={true}
            />
          </div>
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
          {initialValues ? t('form:button-label-update-group') : t('Add Brand')}
        </Button>
      </div>
    </form>
  );
}

import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import {
  ContactDetailsInput,
  Shipping,
  ShopSocialInput,
  Tax,
  AttachmentInput,
  Settings,
} from '@/types';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import { CURRENCY } from './currency';
import { siteSettings } from '@/settings/site.settings';
import ValidationError from '@/components/ui/form-validation-error';
import { useUpdateSettingsMutation } from '@/data/settings';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsValidationSchema } from './settings-validation-schema';
import FileInput from '@/components/ui/file-input';
import SelectInput from '@/components/ui/select-input';
import TextArea from '@/components/ui/text-area';
import Alert from '@/components/ui/alert';
import { getIcon } from '@/utils/get-icon';
import * as socialIcons from '@/components/icons/social';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import omit from 'lodash/omit';
import SwitchInput from '@/components/ui/switch-input';
import { useRouter } from 'next/router';
import { Config } from '@/config';
import { TIMEZONE } from './timeZone';

type FormValues = {
  siteTitle: string;
  siteSubtitle: string;
  currency: any;
  minimumOrderAmount: number;
  logo: any;
  useOtp: boolean;
  taxClass: Tax;
  shippingClass: Shipping;
  signupPoints: number;
  maximumQuestionLimit: number;
  currencyToWalletRatio: number;
  contactDetails: ContactDetailsInput;
  deliveryTime: {
    title: string;
    description: string;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: AttachmentInput;
    twitterHandle: string;
    twitterCardType: string;
    metaTags: string;
    canonicalUrl: string;
  };
  google: {
    isEnable: boolean;
    tagManagerId: string;
  };
  facebook: {
    isEnable: boolean;
    appId: string;
    pageId: string;
  };
};

const socialIcon = [
  {
    value: 'FacebookIcon',
    label: 'Facebook',
  },
  {
    value: 'InstagramIcon',
    label: 'Instagram',
  },
  {
    value: 'TwitterIcon',
    label: 'Twitter',
  },
  {
    value: 'YouTubeIcon',
    label: 'Youtube',
  },
];

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex items-center text-body space-s-4">
      <span className="flex h-4 w-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: 'w-4 h-4',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type IProps = {
  settings?: Settings | null;
  taxClasses: Tax[] | undefined | null;
  shippingClasses: Shipping[] | undefined | null;
};

export default function BusinessSettingsForm({
  settings,
  taxClasses,
  shippingClasses,
}: IProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { mutate: updateSettingsMutation, isLoading: loading } =
    useUpdateSettingsMutation();
  const { language, options } = settings ?? {};
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(settingsValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deliveryTime',
  });

  const {
    fields: socialFields,
    append: socialAppend,
    remove: socialRemove,
  } = useFieldArray({
    control,
    name: 'contactDetails.socials',
  });

  const isNotDefaultSettingsPage = Config.defaultLanguage !== locale;

  async function onSubmit(values: FormValues) {
    const contactDetails = {
      ...values?.contactDetails,
      location: { ...omit(values?.contactDetails?.location, '__typename') },
      socials: values?.contactDetails?.socials
        ? values?.contactDetails?.socials?.map((social: any) => ({
            icon: social?.icon?.value,
            url: social?.url,
          }))
        : [],
    };
    updateSettingsMutation({
      language: locale,
      options: {
        ...values,
        signupPoints: Number(values.signupPoints),
        currencyToWalletRatio: Number(values.currencyToWalletRatio),
        minimumOrderAmount: Number(values.minimumOrderAmount),
        currency: values.currency?.code,
        taxClass: values?.taxClass?.id,
        shippingClass: values?.shippingClass?.id,
        logo: values?.logo,
        contactDetails,
        //@ts-ignore
        seo: {
          ...values?.seo,
          ogImage: values?.seo?.ogImage,
        },
      },
    });
  }

  const logoInformation = (
    <span>
      {t('form:logo-help-text')} <br />
      {t('form:logo-dimension-help-text')} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {t('common:pixel')}
      </span>
    </span>
  );

  // @ts-ignore
  // @ts-ignore
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={logoInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="logo" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('Business')}
          details={t('form:site-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('Name')}
            {...register('siteTitle')}
            error={t(errors.siteTitle?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5">
            <Label>{t('form:input-label-currency')}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={CURRENCY}
              disabled={isNotDefaultSettingsPage}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>
          <div className="mb-5">
            <Label>{t('Time Zone')}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={TIMEZONE}
            //   disabled={isNotDefaultSettingsPage}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Tax"
          details={t('form:site-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('Tax 1 Name')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Tax 1 No.')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('Store Setting')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
            label={t('Domain Name')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Theme Color')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Location')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Whatsapp No')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('About Us')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('Terms and Conditions')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('Privacy Policy')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <FileInput name="logo" control={control} multiple={false} />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t('form:button-label-save-settings')}
        </Button>
      </div>
    </form>
  );
}

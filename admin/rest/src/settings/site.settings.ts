import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';



export const siteSettings = {
  name: 'PickBazar',
  description: '',
  logo: {
    // url: '/logo.svg',
    url: '/ignite-logo.png',
    alt: 'Ignite',
    href: '/',
    width: 128,
    height: 48,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ, Inc.',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'Dashboard',
        icon: 'DashboardIcons',
      },
      {
        href: Routes.customer.list,
        label: 'Customers',
        icon: 'CustomerIcons',
      },
      {
        href: "/catalog",
        label: 'Catalog',
        icon: 'CatalogIcons',
        children: [
          {
            href: Routes.product.list,
            label: 'Products',
            icon: 'TypesIcon',
          },
          {
            href: Routes.category.list,
            label: 'Categories',
            icon: 'TagIcon',
          },
          {
            href: Routes.brands.list,
            label: 'Brands',
            icon: 'BrandIcons',
          },
          {
            href: Routes.unit.list,
            label: 'Unit',
            icon: 'UnitIcons',
          },
          {
            href: Routes.importProduct.list,
            label: 'Import Product',
            icon: 'ImportProductsIcons',
          },
          {
            href: Routes.variant.list,
            label: 'Variation/Adons',
            icon: 'FountainPenIcon',
          },
        ],
      },
      {
          href: Routes.dashboard,
          label: 'Statistic',
          icon: 'StatisticIcons',
      },
      {
        href: "/sales",
        label: 'Sales',
        icon: 'SalesIcons',
        children: [
          {
            href: Routes.invoice.list,
            label: 'Invoices',
            icon: 'InvoiceIcon',
          },
          {
            href: Routes.draft.list,
            label: 'Drafts',
            icon: 'DraftIcons',
          },
          {
            href: Routes.question.list,
            label: 'Quotations',
            icon: 'QuestionIcon',
          },
          {
            href: Routes.creditNotes.list,
            label: 'Credit Notes',
            icon: 'CalendarScheduleIcon',
          },
        ],
      },
      {
        href: "/reports",
        label: 'Reports',
        icon: 'ReviewIcon',
        children: [],
      },
      {
        href: "/settings",
        label: 'Settings',
        icon: 'SettingsIcon',
        children: [
          {
            href: Routes.businessettings,
            label: 'Business Settings',
            icon: 'BusinesSettingIcon',
          },
          {
            href: Routes.settings,
            label: 'Invoice Settings',
            icon: 'SettingsIcon',
          },
        ],
      },
    ],
    shop: [
      {
        href: (shop: string) => `${Routes.dashboard}${shop}`,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.attribute.list}`,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.product.list}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.author.list}`,
        label: 'sidebar-nav-item-authors',
        icon: 'FountainPenIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.manufacturer.list}`,
        label: 'sidebar-nav-item-manufacturers',
        icon: 'DiaryIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.order.list}`,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.refund.list}`,
        label: 'sidebar-nav-item-refunds',
        icon: 'RefundsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.staff.list}`,
        label: 'sidebar-nav-item-staffs',
        icon: 'UsersIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
        label: 'sidebar-nav-item-withdraws',
        icon: 'AttributeIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.reviews.list}`,
        label: 'sidebar-nav-item-reviews',
        icon: 'ReviewIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.question.list}`,
        label: 'sidebar-nav-item-questions',
        icon: 'QuestionIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};

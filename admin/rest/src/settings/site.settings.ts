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
        icon: 'DashboardIcon',
      },
      {
        href: Routes.customer.list,
        label: 'Customers',
        icon: 'ShopIcon',
      },
      {
        href: "/catalog",
        label: 'Catalog',
        icon: 'ProductsIcon',
        children: [
          {
            href: Routes.product.list,
            label: 'Products',
            icon: 'ReviewIcon',
          },
          {
            href: Routes.category.list,
            label: 'Categories',
            icon: 'CategoriesIcon',
          },
          {
            href: Routes.brands.list,
            label: 'Brands',
            icon: 'TypesIcon',
          },
          {
            href: Routes.unit.list,
            label: 'Unit',
            icon: 'TagIcon',
          },
          {
            href: Routes.importProduct.list,
            label: 'Import Product',
            icon: 'DiaryIcon',
          },
          {
            href: Routes.author.list,
            label: 'Variation/Adons',
            icon: 'FountainPenIcon',
          },
        ],
      },
      {
          href: Routes.dashboard,
          label: 'Statistic',
          icon: 'DashboardIcon',
      },
      {
        href: "/sales",
        label: 'Sales',
        icon: 'ProductsIcon',
        children: [
          {
            href: Routes.invoice.list,
            label: 'Invoices',
            icon: 'OrdersIcon',
          },
          {
            href: Routes.draft.list,
            label: 'Drafts',
            icon: 'OrdersStatusIcon',
          },
          {
            href: Routes.question.list,
            label: 'Questions',
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
        href: "/",
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
            href: Routes.settings,
            label: 'Business Settings',
            icon: 'SettingsIcon',
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

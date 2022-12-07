
import { Table } from '@/components/ui/table';
import { SortOrder, Type ,BrandList} from '@/types';
import { getIcon } from '@/utils/get-icon';
import * as typeIcons from '@/components/icons/type';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useEffect, useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import Link from '@/components/ui/link';
import LanguageSwitcher from '@/components/ui/lang-action/action';

import {GetBrandList} from "../../services/Service"
import Badge from '../ui/badge/badge';

export type IProps = {
  listOfBrands: BrandList[] | undefined;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const CustomerList = ({ listOfBrands, onSort, onOrder }: IProps) => {
  const [brandList, setBrandList] = useState()
  useEffect(()=>{
    GetBrandList().then( (result) => {
      setBrandList(result.data);
    })
  },[])
  
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title:"Customers",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:200,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title:"Email",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:200,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">User@gmail.com</span>,
    },
    {
      title:"Registration Date",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:150,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">12/05/2022</span>,
    },
    {
      title:"Order",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:150,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">2 orders</span>,
    },
    {
      title:"Spend",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:150,

      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">$150.00</span>,
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'name',
      key: 'status',
      align: 'left',
      width: 180,
      render: (status: string, record: any) => (
        <div
          className={`flex justify-start ${
            record?.quantity > 0 && record?.quantity < 10
              ? 'flex-col items-baseline space-y-3 3xl:flex-row 3xl:space-x-3 3xl:space-y-0 rtl:3xl:space-x-reverse'
              : 'items-center space-x-3 rtl:space-x-reverse'
          }`}
        >
          <Badge
            text="Active"
            color={
              status.toLocaleLowerCase() === 'draft'
                ? 'bg-yellow-400'
                : 'bg-accent'
            }
          />
          {record?.quantity > 0 && record?.quantity < 10 && (
            <Badge
              text={t('common:text-low-quantity')}
              color="bg-red-600"
              animate={true}
            />
          )}
        </div>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: alignRight,
      render: (slug: string, record: Type) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_TYPE"
          routes={Routes?.customer}
        />
      ),
    },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded shadow">
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t('table:empty-table-data')}
        data={brandList}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default CustomerList;

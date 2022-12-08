
import { Table } from '@/components/ui/table';
import { SortOrder, Type ,BrandList} from '@/types';
import { getIcon } from '@/utils/get-icon';
import Image from 'next/image';

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

export type IProps = {
  listOfBrands: BrandList[] | undefined;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const TypeList = ({ listOfBrands, onSort, onOrder }: IProps) => {
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
      title: "Customer Name",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:120,

      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Contact Number",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:120,

      render: (name: any) => <span className="whitespace-nowrap">03xxxxxxxxx</span>,
    },
    {
      title: "Location",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:120,
      render: (name: any) => <span className="whitespace-nowrap">Pakistan</span>,
    },
    {
      title: "Date",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width:150,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">12/12/2022</span>,
    },
    {
      title: "Invoice No.",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      width:120,
      align: "center",
      render: (name: any) => <span className="whitespace-nowrap">1200</span>,
    },
    {
      title: "Payment Status",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width:120,
      render: (name: any) => <span className="whitespace-nowrap">Pending</span>,
    },
    {
      title: "Payment Method",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width:120,
      render: (name: any) => <span className="whitespace-nowrap">Pending</span>,
    },
    {
      title: "Total Amount",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width:120,
      render: (name: any) => <span className="whitespace-nowrap">$1200</span>,
    },
    {
      title: "Total Paid",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width:120,
      render: (name: any) => <span className="whitespace-nowrap">$200</span>,
    },
    {
      title: "Sell Due",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width:120,
      render: (name: any) => <span className="whitespace-nowrap"></span>,
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
          routes={Routes?.invoice}
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

export default TypeList;

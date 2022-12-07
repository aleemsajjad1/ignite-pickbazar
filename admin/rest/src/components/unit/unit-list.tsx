
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

const UnitList = ({ listOfBrands, onSort, onOrder }: IProps) => {
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
    // {
    //   title: t('table:table-item-id'),
    //   dataIndex: 'id',
    //   key: 'id',
    //   align: 'center',
    //   width: 60,
    // },
    // {
    //   title: t('table:table-item-image'),
    //   dataIndex: 'image',
    //   key: 'image',
    //   align: alignLeft,
    //   width: 74,
    //   render: (image: any, { name }: { name: string }) => (
    //     <Image
    //       src="http://localhost:3002/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2Fconversions%2FApples-thumbnail.jpg&w=48&q=75"
    //       alt={name}
    //       layout="fixed"
    //       width={42}
    //       height={42}
    //       className="overflow-hidden rounded"
    //     />
    //   ),
    // },
    {
      title:"Units",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Short Name",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: "Allow Decimal",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">Yes</span>,
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
          routes={Routes?.unit}
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

export default UnitList;

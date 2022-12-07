
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
import Badge from '../ui/badge/badge';

export type IProps = {
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const TypeList = ( ) => {
  
  const [brandList, setBrandList] = useState();
  const [dummyArr, setDummyArr] = useState([]);

  

  function filter(array:any, text:any) {
    const getNodes = (result:any, object:any) => {
        if (object.name.toLowerCase().includes(text)) {
            result.push(object);
            return result;
        }
        return result;
    };

    return array.reduce(getNodes, []);
}

  useEffect(()=>{
    GetBrandList().then( (result) => {
      setBrandList(result.data);
      setDummyArr(result.data)
    })
  },[])

  const onearchhandle= (e:any) =>{
    let val = e.target.value.toLowerCase();
    let filteredArray = filter(brandList, val);
    setDummyArr(filteredArray);
  }
  
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

 

  const columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: alignLeft,
      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <Image
          src="http://localhost:3002/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2Fconversions%2FApples-thumbnail.jpg&w=48&q=75"
          alt={name}
          layout="fixed"
          width={42}
          height={42}
          className="overflow-hidden rounded"
        />
      ),
    },
    {
      title: "Brands",
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'name',
      key: 'status',
      align: 'left',
      width: 80,
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
          routes={Routes?.brands}
        />
      ),
    },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded shadow">
      {/* <div>
        <input type="text"
         onChange={onearchhandle}/>
      </div> */}
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t('table:empty-table-data')}
        data={dummyArr}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default TypeList;

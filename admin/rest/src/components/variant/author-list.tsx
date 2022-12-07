import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table, AlignType } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Switch } from '@headlessui/react';
import { Attachment, AuthorPaginator, SortOrder } from '@/types';
import { useUpdateAuthorMutation } from '@/data/author';
import { Author, MappedPaginatorInfo } from '@/types';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';

type IProps = {
  authors: Author[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const AuthorList = ({
  authors,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

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

  let columns = [
    {
      title: "Variant Type",
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align:'center' as AlignType,
      ellipsis: true,
      render: (type: any) => (
        <span className="truncate whitespace-nowrap">Size</span>
      ),
    },
    {
      title: "Variant Value",
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align:'center' as AlignType,
      ellipsis: true,
      render: (type: any) => (
        <span className="truncate whitespace-nowrap">Small Large</span>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right' as AlignType,
      render: (slug: string, record: Author) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_AUTHOR"
          routes={Routes?.author}
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter(
      (col) => col?.key !== 'approve' && col?.key !== 'actions'
    );
  }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={authors}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default AuthorList;

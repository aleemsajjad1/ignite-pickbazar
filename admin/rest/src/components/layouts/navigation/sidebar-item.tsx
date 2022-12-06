import Link from '@/components/ui/link';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import NavItemHeader from "./nav-item-header-new";
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
const SidebarItem = (props:any) => {
  const { href, label, icon, children } = props.item;
  const { closeSidebar } = useUI();
  // const [expandedName ,setExpandedname] = useState('');

  // const catalogArray = ['products','categories','brands','unit','importProducts', 'authors'];
  // const SalesArray = ['invoice','drafts','questions','creditNotes'];
  // const SettingArray = ['settings'];

  // const path = window.location.pathname.substr(1,)
  
  // useEffect(()=>{
  //   if(catalogArray.includes(path)){
  //     setExpandedname('Catalog');
  //   }
  //   else if (SalesArray.includes(path)) {
  //     setExpandedname('Sales');
  //   } else if(SettingArray.includes(path)){
  //     setExpandedname('Settings');
  //   }
  // })

  if (children) {
    return <NavItemHeader child={props.item.children} item={props.item}  />
  }

  return (
    <Link
      href={href}
      className="text-start flex w-full items-center text-base text-body-dark focus:text-accent"
    >
      {getIcon({
        iconList: sidebarIcons,
        iconName: icon,
        className: 'w-5 h-5 me-4',
      })}
      <span onClick={() => closeSidebar()}>{label}</span>
    </Link>
  );
};

export default SidebarItem;

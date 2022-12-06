import React from 'react';
import { IosArrowDown } from '@/components/icons/ios-arrow-down';
import { IosArrowUp } from '@/components/icons/ios-arrow-up';
import { useTranslation } from 'next-i18next';
import DashboardInner from './DashboardInnerCmp';
import { DollarIcon } from '../icons/shops/dollar';
import { RightIcon } from '../icons/shops/Right';
import { TickIcon } from '../icons/shops/tickIco';
import { CopyIcon } from '../icons/shops/copyIcon';
import { IoCopy } from "react-icons/io5";
import { MdContentCopy ,MdPayment,MdOutlineDone} from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { RiUserFollowLine } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";


const DashboardSetUp = ({ titleTransKey }: any) => {
  const { t } = useTranslation('widgets');
  return (
    <div className="flex h-full w-full flex-col rounded bg-light p-7">
      <div className="mb-auto flex w-full justify-between pb-8">
        <div className="flex flex-col">
          <span className="mb-1 text-base font-semibold text-heading">
            {t(titleTransKey)}
          </span>
        </div>

        <div className="">
          <span className="mb-1 text-base font-semibold text-heading">
            Completed : 4/5
          </span>
        </div>
      </div>
      <div>
        <DashboardInner
          icon={<MdContentCopy color='#B5B5C3' className="h-6 w-6" />}
          rightIcon={<RightIcon className="h-7 w-7" color="#B5B5C3" />}
          tickIcon={<MdOutlineDone className="h-7 w-7" color="#fff" />}
          iconBgStyle={{ backgroundColor: '#fff' }}
          tickIconBgStyle={{ backgroundColor: '#3699FF'}}
          rightIconBgStyle={{backgroundColor: "#B5B5C3"}}
          comText="File Your Store Information"
          comTextTitle="Fill in your store information for a safe sale."
          changeIcon={false}
        />
      </div>
      <div className="mt-5">
      <DashboardInner
          icon={<IoIosAdd className="h-7 w-7" color="#B5B5C3" />}
          rightIcon={<BsArrowRight className="h-7 w-7" color="#B5B5C3" />}
          tickIcon={<MdOutlineDone className="h-7 w-7" color="#fff" />}
          iconBgStyle={{ backgroundColor: '#fff' }}
          tickIconBgStyle={{ backgroundColor: '#3699FF'}}
          rightIconBgStyle={{backgroundColor: "#B5B5C3"}}
          comText="Add your products or services"
          comTextTitle="Get started by adding names, prices, and images"
          changeIcon={true}
        />
      </div>
      <div className="mt-5">
      <DashboardInner
          icon={<RiUserFollowLine className="h-7 w-7" color="#B5B5C3" />}
          rightIcon={<BsArrowRight className="h-7 w-7" color="#B5B5C3" />}
          tickIcon={<MdOutlineDone className="h-7 w-7" color="#fff" />}
          iconBgStyle={{ backgroundColor: '#fff' }}
          tickIconBgStyle={{ backgroundColor: '#3699FF'}}
          rightIconBgStyle={{backgroundColor: "#B5B5C3"}}
          comText="Set up payment options"
          comTextTitle="Accept payment via credit card, Paypal, trip and more"
          changeIcon={false}
        />
      </div>
      <div className="mt-5">
      <DashboardInner
          icon={<MdPayment className="h-7 w-7" color="#B5B5C3" />}
          rightIcon={<BsArrowRight className="h-7 w-7" color="#B5B5C3" />}
          tickIcon={<MdOutlineDone className="h-7 w-7" color="#fff" />}
          iconBgStyle={{ backgroundColor: '#fff' }}
          tickIconBgStyle={{ backgroundColor: '#3699FF'}}
          rightIconBgStyle={{backgroundColor: "#B5B5C3"}}
          comText="Set up your sales channel"
          comTextTitle="Website, mobile app, DK and more. Activate the most suitable sales channel for you."
          changeIcon={false}
        />
      </div>
      <div className="mt-5">
      <DashboardInner
          icon={<DollarIcon className="h-7 w-7" color="#B5B5C3" />}
          rightIcon={<BsArrowRight className="h-7 w-7" color="#B5B5C3" />}
          tickIcon={<MdOutlineDone className="h-7 w-7" color="#fff" />}
          iconBgStyle={{ backgroundColor: '#fff' }}
          tickIconBgStyle={{ backgroundColor: '#3699FF'}}
          rightIconBgStyle={{backgroundColor: "#B5B5C3"}}
          comText="Make your first sale!"
          comTextTitle="hip your first sale and product to your customers."
          changeIcon={true}
        />
      </div>
    </div>
  );
};

export default DashboardSetUp;

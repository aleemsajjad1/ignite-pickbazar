import React from 'react';

const DashboardInner = ({
  icon,
  iconBgStyle,
  comText,
  comTextTitle,
  changeIcon,
  rightIcon,
  tickIcon,
  tickIconBgStyle,
  rightIconBgStyle
}: any) => {
  return (
    <div
      className="flex h-full w-full flex-col rounded"
      style={{ backgroundColor: '#F3F6F9', padding: 15 }}
    >
      <div className="h-30 grid grid-cols-12 gap-4">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 ms-3"
          style={iconBgStyle}
        >
          {icon}
        </div>
        <div className="col-span-10">
          <div className="flex w-full flex-col">
            <span className="mb-1 text-base font-semibold text-heading">
              {comText}
            </span>
            <span className="text-xs font-semibold text-body">
              {comTextTitle}
            </span>
          </div>
        </div>
        {changeIcon == false ? (
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 ms-3"
            style={tickIconBgStyle}
          >
            {tickIcon}
          </div>
        ) : (
          <div
          style={{paddingTop:14,paddingLeft:20}}
            // className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 ms-3"
            // style={rightIconBgStyle}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardInner;

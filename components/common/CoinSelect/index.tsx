import React, { useRef, useState } from "react";
import styles from "./coin-select.module.scss";
import { getRandomKey } from "utils/randomKey";
import { useEscapeKey, useClickOutside, useKeyDown } from "hooks";
import TippyHeadless from "@tippyjs/react/headless";
import { DownArrowIcon, EthIcon, UsdtIcon, VerifiedIcon } from "assets/images";
import { useElementSize } from "usehooks-ts";
import { motion } from "framer-motion";
import { ISearchableListItem } from "interfaces";
interface Props {
  onSelect: (item: ISearchableListItem) => void;
}

const CoinSelect = ({ onSelect }: Props) => {
  const listItemHeight = 40.5;
  const [highlightIndex, sethighlightIndex] = useState<null | number>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setselectedIndex] = useState<number>(0);

  let filters = [
    {
      name: "USDT",
      img: "https://s2.coinmarketcap.com/static/img/coins/32x32/825.png",
    },
    {
      name: "ETH",
      img: "https://s2.coinmarketcap.com/static/img/exchanges/32x32/1027.png",
    },
  ];

  const handleSelect = (item: ISearchableListItem) => {
    onSelect(item);
    const index = filters.findIndex((i) => i.name === item.name);
    setselectedIndex(index);
    handleClose();
  };

  const handleDownArrow = () => {
    if (!isOpen) setisOpen(true);

    const currentIndex = highlightIndex;
    let nextIndex = 0;
    let scrollTo = (currentIndex || 0) * listItemHeight;
    if (currentIndex !== null) {
      if (currentIndex < filters.length - 1) nextIndex = currentIndex + 1;
      if (currentIndex === filters.length - 1) scrollTo = 0;
    }
    sethighlightIndex(nextIndex);
    listRef.current?.scroll(0, scrollTo);
  };

  const handleUpArrow = () => {
    if (!isOpen) setisOpen(true);

    const currentIndex = highlightIndex;
    let nextIndex = filters.length - 1;
    let scrollTo = filters.length * listItemHeight;
    if (currentIndex) {
      nextIndex = currentIndex - 1;
      scrollTo = nextIndex * listItemHeight - listItemHeight;
    }
    sethighlightIndex(nextIndex);
    listRef.current?.scroll(0, scrollTo);
  };

  const handleKeyDown = (e: any) => {
    if (!filters.length) return;

    if (e.key === "ArrowDown") handleDownArrow();
    if (e.key === "ArrowUp") handleUpArrow();
    if (e.key === "Enter") {
      if (highlightIndex === null) return;
      handleSelect(filters[highlightIndex]);
    }
    if (e.key === "Tab") {
      setisOpen(false);
    }
    e.preventDefault();
  };

  const [isOpen, setisOpen] = useState(false);
  const toolTipRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (!isOpen) return;
    sethighlightIndex(null);
    setisOpen(false);
  };

  useClickOutside(toolTipRef, handleClose);
  useKeyDown(isOpen, handleKeyDown);
  useEscapeKey(handleClose);

  const willScroll = filters.length > 4;

  let filterListClass = styles["filter-list"];
  if (willScroll) filterListClass += ` ${styles["scroll"]}`;
  const ImgIcon = ({ name }: { name: string }) => {
    if (name === "USDT") return <UsdtIcon />;
    if (name === "ETH") return <EthIcon />;
    return <UsdtIcon />;
  };
  return (
    <div className="w-full">
      <div
        onClick={() => setisOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        ref={toolTipRef}
        className={`${styles["container"]} whitespace-nowrap`}
      >
        <div className="flex items-center gap-x-3 justify-between w-full">
          <ImgIcon name={filters[selectedIndex].name} />
          <span className="text-purple-100 user-select-none">
            {filters[selectedIndex].name}
          </span>
          <div className="gap-x-3 flex items-center ">
            <motion.div
              initial={{ rotate: 0 }}
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              <DownArrowIcon />
            </motion.div>
          </div>
        </div>
      </div>

      <TippyHeadless
        visible={isOpen}
        reference={toolTipRef?.current}
        render={(attrs) => (
          <div className={`${styles["filters-container"]} `}>
            <div ref={listRef} className={filterListClass}>
              <ul>
                {filters.map((item, index) => {
                  let className = `p-[10px] flex gap-x-0.5 items-center px-4 items-center`;
                  let isSelected = false;
                  if (selectedIndex !== null) {
                    const selectedItem = filters[selectedIndex];
                    isSelected = selectedItem === item;
                  }
                  if (highlightIndex !== null) {
                    const isActive = index === highlightIndex;
                    if (isActive) className += ` ${styles["active"]}`;
                    else if (
                      !isActive &&
                      className.includes(styles["active"])
                    ) {
                      className.replace(styles["active"], "");
                    }
                  }

                  return (
                    <li
                      key={getRandomKey()}
                      className={className}
                      onClick={() => handleSelect(item)}
                    >
                      <div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {isSelected && (
                        <div className={`${styles["selected-icon"]} ml-auto`}>
                          <VerifiedIcon />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        interactive={true}
        placement="bottom"
        appendTo={() => toolTipRef?.current || document.body}
        arrow={false}
        offset={[0, 12]}
      />
    </div>
  );
};

const MemoizedCoinSelect = React.memo(CoinSelect);
export { MemoizedCoinSelect as CoinSelect };

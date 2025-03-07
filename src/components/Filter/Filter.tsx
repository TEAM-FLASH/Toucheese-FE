import Button from '@components/Button/Button';
import { Options, SortBy } from '@pages/Home/Home';
import { useEffect, useState } from 'react';

interface FilterProps {
  text: string;
  onClick: () => void;
  params: string;
  paramsName: string;
  paramsKeyword?: SortBy | Options;
}

const Filter = ({ text, onClick, params, paramsKeyword, paramsName }: FilterProps) => {
  const [activeText, setActiveText] = useState<string>(text);

  useEffect(() => {
    const decodParams = decodeURIComponent(params);
    const URLParams = new URLSearchParams(decodParams);

    const sortByResult = URLParams.get('sortBy') || '';
    const optionsResult = URLParams.get('options') || '';
    const minPriceResult = URLParams.get('minPrice') || '';
    const maxPriceResult = URLParams.get('maxPrice') || '';

    if (paramsName === 'sortBy') {
      const keyword = paramsKeyword as SortBy;
      setActiveText(keyword[sortByResult as keyof SortBy] || text);
    } else if (paramsName === 'options') {
      setActiveText(optionsResult ? `매장정보 ${optionsResult.split('%').length}개` : text);
    } else if (paramsName === 'minPrice' || 'maxPrice') {
      setActiveText(
        minPriceResult || maxPriceResult ? `${minPriceResult} ~ ${maxPriceResult}원` : text,
      );
    }
  }, [params, paramsKeyword, text]);

  return (
    <Button
      type="button"
      text={activeText}
      variant="white"
      size="xsmall"
      width="fit"
      icon={<img src="/img/icon-arrowdown.svg" alt="닫기 아이콘" />}
      iconSizeWidth="1.1rem"
      iconSizeHeight="0.6rem"
      iconPosition="right"
      disabled={false}
      active={params.includes(paramsName)}
      onClick={onClick}
    />
  );
};

export default Filter;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ICarsAPIWinners } from '../../types/types';
import getWinners from '../../APIFunctions/getWinners';

function PaginationWinners(pageProps:{pageWinners: number,
  setPageWinners: React.Dispatch<React.SetStateAction<number>>, total: string,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
  sort: string, order: string }): JSX.Element {
  const { pageWinners, setPageWinners, total,
    setWinnerTable, sort, order } = pageProps;
  const [isPrevDis, setIsPrevDis] = useState(true);

  async function nextPage(): Promise<void> {
    if ((+total - (pageWinners * 10)) > 0) {
      setPageWinners((value) => value + 1);
    }
  }
  async function prevPage(): Promise<void> {
    if (pageWinners > 1) {
      setPageWinners(pageWinners - 1);
    }
  }

  useEffect(() => {
    if (pageWinners > 1) {
      setIsPrevDis(false);
    } else {
      setIsPrevDis(true);
    }
    getWinners(pageWinners, sort, order).then((res) => setWinnerTable(res));
  }, [pageWinners]);
  return (
    <div className='main__pagination pagin'>
      <button type='button' disabled={isPrevDis} onClick={prevPage} className='pagin__prevBtn'>Prev</button>
      <button type='button' onClick={nextPage} className='pagin__nextBtn'>Next</button>
    </div>
  );
}

export default PaginationWinners;

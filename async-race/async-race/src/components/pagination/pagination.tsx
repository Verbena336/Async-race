import React, { useEffect, useState } from 'react';
import './pagination.scss';

function Pagination(pageProps:{page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  total: string }): JSX.Element {
  const { page, setPage, total } = pageProps;
  const [isPrevDis, setIsPrevDis] = useState(true);
  function nextPage(): void {
    (document.querySelector('.controls__reset') as HTMLElement).click();
    if ((+total - (page * 7)) > 0) {
      setPage((value) => value + 1);
    }
  }
  function prevPage(): void {
    (document.querySelector('.controls__reset') as HTMLElement).click();
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    if (page > 1) {
      setIsPrevDis(false);
    } else {
      setIsPrevDis(true);
    }
  }, [page]);
  return (
    <div className='main__pagination pagin'>
      <button type='button' disabled={isPrevDis} onClick={prevPage} className='pagin__prevBtn'>Prev</button>
      <button type='button' onClick={nextPage} className='pagin__nextBtn'>Next</button>
    </div>
  );
}

export default Pagination;

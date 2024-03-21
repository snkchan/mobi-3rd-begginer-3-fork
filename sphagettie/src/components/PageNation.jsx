import { useEffect } from "react"
import { KEY } from "../const"
import { useFetchData } from "../hooks/use-fetch-data"

const PageNation = ({ address }) => {
  const {
    getParamValues,
    setParamValues,
    fetchDataByFormAndAdd,
    postData: pageNation,
  } = useFetchData()

  const { page, take, limit } = getParamValues()

  useEffect(() => {
    fetchDataByFormAndAdd({
      form: "PageNation",
      address: address,
    })
  }, [page])

  const onClickPage = ({ page }) => {
    setParamValues({ page, take, limit })
  }
  if (!pageNation) return

  const isPrevPageVisible = pageNation.startPage !== 1
  const isNextPageVisible =
    pageNation.startPage + parseInt(take) < pageNation.totalPage

  return (
    <div>
      {isPrevPageVisible && (
        <button onClick={() => onClickPage({ page: pageNation.startPage - 1 })}>
          이전
        </button>
      )}
      {Array(pageNation.endPage - pageNation.startPage + 1)
        .fill()
        .map((_, i) => pageNation.startPage + i)
        .map((page) => (
          <button key={page} onClick={() => onClickPage({ page: page })}>
            {page}
          </button>
        ))}
      {isNextPageVisible && (
        <button onClick={() => onClickPage({ page: pageNation.endPage + 1 })}>
          다음
        </button>
      )}
    </div>
  )
}
export default PageNation

import { useEffect } from "react"
import { KEY } from "../const"
import { useFetchData } from "../hooks/use-fetch-data"

const PageNation = ({ address }) => {
  const {
    getParamValues,
    setParamValues,
    fetchPostDataByUrlAndDataForm,
    postData: pageNation,
  } = useFetchData()

  const paramValues = getParamValues({
    keyArr: [KEY.PAGE, KEY.LIMIT, KEY.TAKE],
  })

  useEffect(() => {
    fetchPostDataByUrlAndDataForm({
      ...paramValues,
      dataForm: "PageNation",
      address: address,
    })
  }, [paramValues[KEY.PAGE]])

  const onClickPage = ({ page }) => {
    setParamValues({
      keyValueArr: [
        [KEY.PAGE, page],
        [KEY.LIMIT, paramValues[KEY.LIMIT]],
        [KEY.TAKE, paramValues[KEY.TAKE]],
      ],
    })
  }
  if (!pageNation) return

  const isPrevPageVisible = pageNation.startPage !== 1
  const isNextPageVisible =
    pageNation.startPage + +paramValues[KEY.TAKE] < pageNation.totalPage

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

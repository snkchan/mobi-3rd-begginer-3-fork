import { useFetchData } from "../../hooks/use-fetch-data"
import { KEY } from "../../const"
import { useEffect } from "react"

const PostPageNation = () => {
  const {
    getParamValues,
    setParamValues,
    fetchPostDataByUrlAndDataForm,
    pageNation,
  } = useFetchData()

  const paramValues = getParamValues({
    keyArr: [KEY.PAGE, KEY.LIMIT, KEY.TAKE],
  })
  const curPage = paramValues[KEY.PAGE]

  useEffect(() => {
    fetchPostDataByUrlAndDataForm({
      ...{ ...paramValues, dataForm: "PageNation" },
    })
  }, [curPage])

  const onClickPage = ({ page }) => {
    setParamValues({
      keyValueArr: [
        [KEY.PAGE, page],
        [KEY.LIMIT, paramValues[KEY.LIMIT]],
        [KEY.TAKE, paramValues[KEY.TAKE]],
      ],
    })
  }
  const isPrevPageVisible = pageNation?.startPage !== 1
  const isNextPageVisible =
    Math.ceil(pageNation?.currentPage / curPage) !==
    Math.ceil(pageNation?.totalPage / curPage)

  if (!pageNation) return

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
export default PostPageNation

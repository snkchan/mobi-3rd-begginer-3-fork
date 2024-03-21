import { useEffect, useState } from "react"
import { useFetchData } from "../hooks/use-fetch-data"
import { KEY } from "../const"
import PageNation from "../components/PageNation"
import { checkUserAuth } from "../utils"

const PostDetailPage = () => {
  const [isOpenCommentList, setIsOpenCommentList] = useState(false)
  const {
    setParamValues,
    getParamValues,
    fetchPostDataByUrlAndDataForm,
    fetchPostDetail,
    postData: commentList,
    postDetail,
  } = useFetchData()

  useEffect(() => {
    checkUserAuth()
    fetchPostDetail()
    setParamValues({
      keyValueArr: [
        [KEY.PAGE, 1],
        [KEY.LIMIT, 10],
        [KEY.TAKE, 10],
      ],
    })
  }, [])

  const paramValues = getParamValues({
    keyArr: [KEY.PAGE, KEY.LIMIT, KEY.TAKE],
  })

  useEffect(() => {
    if (!isOpenCommentList) return
    fetchPostDataByUrlAndDataForm({
      ...paramValues,
      dataForm: "Comments",
      address: "comments",
    })
  }, [paramValues[KEY.PAGE]])

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true)
    await fetchPostDataByUrlAndDataForm({
      ...paramValues,
      dataForm: "Comments",
      address: "comments",
    })
  }

  const onClickHiddenComments = () => {
    setIsOpenCommentList(false)
  }
  if (!postDetail) return
  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        {!isOpenCommentList && (
          <button onClick={onClickMoreComments}>댓글 보기</button>
        )}
        {isOpenCommentList && (
          <button onClick={onClickHiddenComments}>댓글 숨기기</button>
        )}
        {isOpenCommentList && (
          <>
            {commentList?.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.User.nickName}</p>
              </div>
            ))}
            <PageNation address="comments" />
          </>
        )}
      </div>
    </div>
  )
}
export default PostDetailPage

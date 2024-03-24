import { useEffect, useState } from "react"
import { useFetchData } from "../hooks/use-fetch-data"
import PageNation from "../components/PageNation"
import { checkUserAuth } from "../utils"

const PostDetailPage = () => {
  const [isOpenCommentList, setIsOpenCommentList] = useState(false)
  const {
    setParamValues,
    getParamValues,
    fetchDataByFormAndAdd,
    fetchPostDetail,
    postData: commentList,
    postDetail,
  } = useFetchData()

  useEffect(() => {
    checkUserAuth()
    fetchPostDetail()
    setParamValues({ page: 1, take: 10, limit: 10 })
  }, [])

  const { page } = getParamValues()

  useEffect(() => {
    if (!isOpenCommentList) return
    fetchDataByFormAndAdd({
      form: "Comments",
      address: "comments",
    })
  }, [page])

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true)
    await fetchDataByFormAndAdd({
      form: "Comments",
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
        {!isOpenCommentList ? (
          <button onClick={onClickMoreComments}>댓글 보기</button>
        ) : (
          <>
            <button onClick={onClickHiddenComments}>댓글 숨기기</button>
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

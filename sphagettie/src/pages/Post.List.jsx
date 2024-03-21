import { useEffect } from "react"
import { DialLogState, useDiaLogStore } from "../contexts/DialogProvider"
import { checkUserAuth } from "../utils"
import { useFetchData } from "../hooks/use-fetch-data"
import { KEY } from "../const"
import PageNation from "../components/PageNation"
const PostListPage = () => {
  const [, setDiaLogAttribute] = useDiaLogStore()
  const {
    getParamValues,
    setParamValues,
    fetchPostDataByUrlAndDataForm,
    postData: postList,
  } = useFetchData()

  useEffect(() => {
    checkUserAuth()
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
    fetchPostDataByUrlAndDataForm({
      ...paramValues,
      address: "posts",
    })
  }, [paramValues[KEY.PAGE]])

  const onClickPost = async (postId) => {
    await setDiaLogAttribute({
      type: DialLogState.CONFIRM,
      text: "정말로 페이지를 이동하겠습니까",
      isOpen: true,
      onConfirm: async () => {
        await setDiaLogAttribute({
          text: "정말로 이동해버린다요!",
          onConfirm: async () => {
            window.location.href = `/post-detail/${postId}`
          },
        })
      },
      onCancel: () => {
        setDiaLogAttribute({ isOpen: false })
      },
    })
  }
  if (!postList) return
  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {postList.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      <PageNation address="posts" />
    </table>
  )
}
export default PostListPage

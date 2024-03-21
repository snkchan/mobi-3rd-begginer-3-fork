import { useEffect } from "react"
import { DialLogState, useDiaLogStore } from "../contexts/DialogProvider"
import PostPageNation from "../components/pagenation/Pagenation.Post"
import { checkUserAuth } from "../utils"
import { useFetchData } from "../hooks/use-fetch-data"
import { KEY } from "../const"
const PostListPage = () => {
  const [, setDiaLogAttribute] = useDiaLogStore()
  const {
    changeParams,
    getParamValueByKey,
    setParamValueByKey,
    fetchPostDataByUrlAndDataType,
    postData: postList,
  } = useFetchData()

  useEffect(() => {
    checkUserAuth()
    setParamValueByKey({ key: KEY.PAGE, value: 1 })
    setParamValueByKey({ key: KEY.TAKE, value: 10 })
    setParamValueByKey({ key: KEY.LIMIT, value: 10 })
    changeParams()
  }, [])

  const curPage = getParamValueByKey({ key: KEY.PAGE })
  const take = getParamValueByKey({ key: KEY.TAKE })
  const limit = getParamValueByKey({ key: KEY.LIMIT })

  // const limit = getParamValueByKey({ key: KEY.LIMIT })

  useEffect(() => {
    fetchPostDataByUrlAndDataType({
      take: 10,
      // limit: limit,
      // page: curPage,
      dataForm: "Posts",
    })
  }, [curPage])

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
      <PostPageNation />
    </table>
  )
}
export default PostListPage

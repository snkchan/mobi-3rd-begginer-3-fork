import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useFetchData = () => {
  const [params, setParams] = useSearchParams()
  const [postList, setPostList] = useState([])

  const getParamValueByKey = ({key}) => {
    return params.get(key)
  }

  const setParamValueByKey = ({key, value}) => {
    params.set(key, value)
    setParams(params)
  }
  /**
   * @description
   * @paramter page - string : url의 page값
   * @paramter limit - string : url의 limit
   * @paramter take - string : url의 take값
   * @paramter type - string : "Posts" | "PageNation"
   *
   */
  const fetchPostDataByUrlAndDataType = async ({ page, limit, take, type }) => {
    const response = await axios.get("/api/posts", {
      params: {
        take,
        page,
        limit,
      },
    })
    setPostList(response.data[type])
  }
  return {
    getParamValueByKey,
    setParamValueByKey,
    fetchPostDataByUrlAndDataType,
    postList,
  }
}

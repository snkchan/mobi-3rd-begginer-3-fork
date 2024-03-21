import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { KEY } from "../const"

export const useFetchData = () => {
  const [params, setParams] = useSearchParams()
  const [postData, setPostData] = useState()
  const [postDetail, setPostDetail] = useState()

  /**
   * @description query key:value쌍을 반환
   */
  const getParamValues = () => {
    return {
      take: params.get(KEY.TAKE),
      page: params.get(KEY.PAGE),
      limit: params.get(KEY.LIMIT),
    }
  }
  /**
   * @description query key에 값을 선언
   */
  const setParamValues = ({ page, limit, take }) => {
    params.set(KEY.PAGE, page)
    params.set(KEY.LIMIT, limit)
    params.set(KEY.TAKE, take)
    setParams(params)
  }

  /**
   * @description
   * @paramter dataForm - string : "Posts" | "PageNation" | "Comments"
   * @paramter address - string : "posts" | "comments"
   */
  const fetchDataByFormAndAdd = async ({ form = "Posts", address }) => {
    const response = await axios.get(`/api/${address}`, {
      params: {
        take: params.get(KEY.TAKE),
        page: params.get(KEY.PAGE),
        limit: params.get(KEY.LIMIT),
      },
    })
    setPostData(response.data[form])
  }
  const fetchPostDetail = async () => {
    const response = await axios.get("/api/post")
    setPostDetail(response.data)
  }

  return {
    getParamValues,
    setParamValues,
    fetchDataByFormAndAdd,
    fetchPostDetail,
    postData,
    postDetail,
  }
}

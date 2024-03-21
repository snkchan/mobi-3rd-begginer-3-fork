import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useFetchData = () => {
  const [params, setParams] = useSearchParams()
  const [postList, setPostList] = useState([])
  const [pageNation, setPageNation] = useState()

  /**
   * @parmeter keyArr - Array : [key,key, ...]
   */
  const getParamValues = ({ keyArr }) => {
    const urlObj = {}
    keyArr.forEach((key) => (urlObj[key] = params.get(key)))
    return urlObj
  }
  /**
   * @paramter keyValueArr - Array[Array] : [[key,value]...]
   */
  const setParamValues = ({ keyValueArr }) => {
    keyValueArr.forEach((keyVal) => params.set(keyVal[0], keyVal[1]))
    setParams(params)
  }

  /**
   * @description
   * @paramter page - string : url의 page값
   * @paramter limit - string : url의 limit
   * @paramter take - string : url의 take값
   * @paramter dataForm - string : "Posts" | "PageNation"
   *
   */
  const fetchPostDataByUrlAndDataForm = async ({
    take,
    page,
    limit,
    dataForm,
  }) => {
    const response = await axios.get("/api/posts", {
      params: {
        take,
        page,
        limit,
      },
    })
    if (dataForm === "Posts") return setPostList(response.data[dataForm])
    if (dataForm === "PageNation")
      return setPageNation({ ...response.data[dataForm] })
  }
  return {
    getParamValues,
    setParamValues,
    fetchPostDataByUrlAndDataForm,
    postList,
    pageNation,
  }
}

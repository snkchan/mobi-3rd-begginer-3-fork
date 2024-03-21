import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useFetchData = () => {
  const [params, setParams] = useSearchParams()
  const [postData, setPostData] = useState([])

  const getParamValueByKey = ({ key }) => {
    return params.get(key)
  }

  const setParamValueByKey = ({ key, value }) => {
    params.set(key, value)
  }
  const changeParams = () => {
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
  const fetchPostDataByUrlAndDataType = async ({
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
    setPostData(response.data[dataForm])
  }
  return {
    changeParams,
    getParamValueByKey,
    setParamValueByKey,
    fetchPostDataByUrlAndDataType,
    postData,
  }
}

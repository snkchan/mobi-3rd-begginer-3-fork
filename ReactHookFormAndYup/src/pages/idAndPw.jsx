import { schemeEmailAndPw } from "../schemes"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterBase, InputAndErrors } from "../components"
import { useNavigate } from "react-router-dom"

const IdAndPw = () => {
  const navi = useNavigate()
  const history = JSON.parse(sessionStorage.getItem("data")) ?? ""
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schemeEmailAndPw) })

  const onSubmit = (e) => {
    const newHistory = { ...history, ...e }
    sessionStorage.setItem("data", JSON.stringify(newHistory))
    JSON.parse(sessionStorage.getItem("data"))
    navi("/birth&moblie")
  }

  return (
    <RegisterBase
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title="ID&Email"
      RegisterForm={
        <>
          <InputAndErrors
            defaultValue={history.email}
            placeholder="email을 입력해주세요"
            register={register}
            resgisterKey={"email"}
            errors={errors}
          />
          <InputAndErrors
            defaultValue={history.password}
            placeholder="password를 입력해주세요"
            register={register}
            resgisterKey={"password"}
            errors={errors}
          />
        </>
      }
    />
  )
}
export default IdAndPw

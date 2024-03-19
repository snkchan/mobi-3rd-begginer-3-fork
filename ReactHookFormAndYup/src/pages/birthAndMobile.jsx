import { InputAndErrors, RegisterBase } from "../components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemeBirthAndMobile } from "../schemes"
import { useNavigate } from "react-router-dom"

const BirthAndMobile = () => {
  const navi = useNavigate()
  const history = JSON.parse(sessionStorage.getItem("data"))
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schemeBirthAndMobile) })

  const onSubmit = (e) => {
    console.log(e)
    const newHistory = { ...history, ...e }
    sessionStorage.setItem("data", JSON.stringify(newHistory))
    navi("/comment")
  }

  return (
    <RegisterBase
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title="Birth&Mobile"  
      RegisterForm={
        <>
          <InputAndErrors
            defaultValue={history.mobile}
            placeholder="010-0000-0000"
            register={register}
            resgisterKey={"mobile"}
            errors={errors}
          />
          <InputAndErrors
            defaultValue={history.birth}
            placeholder=" YYYY-MM-DD"
            register={register}
            resgisterKey={"birth"}
            errors={errors}
          />
        </>
      }
    />
  )
}
export default BirthAndMobile

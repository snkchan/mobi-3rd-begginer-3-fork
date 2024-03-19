import { schemeEmailAndPw } from "../schemes"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterBase, InputAndErrors } from "../components"
const IdAndPw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schemeEmailAndPw) })

  const onSubmit = (e) => {
    console.log(e)
  }

  return (
    <RegisterBase
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      targetPageUrl="/birth&moblie"
      title="ID&Email"
      RegisterForm={
        <>
          <InputAndErrors
            placeholder="email을 입력해주세요"
            register={register}
            resgisterKey={"email"}
            errors={errors}
          />
          <InputAndErrors
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

import { RegisterBase, TextareaAndErrors } from "../components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemeComment } from "../schemes"
const Comment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schemeComment) })

  const onSubmit = (e) => {
    console.log(e)
  }
  return (
    <RegisterBase
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      targetPageUrl="/birth&moblie"
      title="Comment"
      RegisterForm={
        <TextareaAndErrors
          placeholder="100~300자 사이로 입력해주세요"
          register={register}
          resgisterKey={"comment"}
          errors={errors}
        />
      }
    />
  )
}
export default Comment

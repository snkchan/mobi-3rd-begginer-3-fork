import { InputAndErrors, RegisterBase } from "../components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemeBirthAndMobile } from "../schemes"

const BirthAndMobile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schemeBirthAndMobile) })

  const onSubmit = (e) => {
    console.log(e)
  }

  return (
    <RegisterBase
      isValid={isValid}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      targetPageUrl="/comment"
      title="Birth&Mobile"
      RegisterForm={
        <>
          <InputAndErrors
            placeholder="010-0000-0000"
            register={register}
            resgisterKey={"mobile"}
            errors={errors}
          />
          <InputAndErrors
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

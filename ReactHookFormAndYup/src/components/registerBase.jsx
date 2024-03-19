import { useNavigate } from "react-router-dom"
import SubmitButton from "./submitButton"

const RegisterBase = ({
  handleSubmit,
  onSubmit,
  isValid,
  title,
  RegisterForm,
  targetPageUrl,
}) => {
  const navi = useNavigate()

  return (
    <>
      <div className="w-1 h-[5rem]" />
      <div className="w-[40rem] h-[35rem] border-[10px] border-solid border-theme-mainOppsite-light rounded-3xl">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-[4rem] text-center w-fit h-fit">{title}</div>
          {RegisterForm}
          <SubmitButton
            type="submit"
            disable={isValid}
            onClick={() => {
              navi(targetPageUrl)
            }}
          >
            next
          </SubmitButton>
        </form>
      </div>
    </>
  )
}

export default RegisterBase

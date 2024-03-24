import { tailwindMerge } from "../utils"

const SubmitButton = ({ children, disable = true, ...rest }) => {
  return (
    <button
      disabled={!disable}
      className={tailwindMerge(
        " border-[0.3rem] border-solid text-center border-theme-mainOppsite-thick text-tiny font-bold rounded-full p-2 w-fit h-fit hover:bg-theme-mainOppsite-light",
        !disable && "bg-grayScale-100 hover:bg-grayScale-100"
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
export default SubmitButton

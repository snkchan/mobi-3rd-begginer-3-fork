const SubmitButton = ({ children, ...rest }) => {
  return (
    <button
      className=" border-[0.3rem] border-solid text-center border-theme-mainOppsite-thick text-tiny font-bold rounded-full p-2 w-fit h-fit hover:bg-theme-mainOppsite-light"
      {...rest}
    >
      {children}
    </button>
  )
}
export default SubmitButton

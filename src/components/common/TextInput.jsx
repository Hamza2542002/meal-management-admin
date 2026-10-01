function InputField({ placeholder, type, id, register, error }) {
  return (
    <>
      {type === 'textarea' ? (
        <textarea
          {...register}
          id={id}
          placeholder={placeholder}
          rows='4'
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
        />
      ) : (
        <input type={type}
          id={id}
          {...register}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
        />
      )}
      {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
    </>
  )
}
function IconInputField({ Icon, type, placeholder, id, register, error }) {
  return (
    <>
      <div className='flex items-center gap-2 border border-gray-300 rounded-md py-2 px-3'>
        <Icon size={20} />
        <input type={type}
          {...register}
          id={id}
          placeholder={placeholder}
          className=" focus:outline-none w-full"
        />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
    </>
  )
}

export { IconInputField, InputField }
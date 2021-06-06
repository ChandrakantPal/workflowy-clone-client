import classNames from 'classnames'
interface InputGroupProps {
  type: string
  placeholder: string
  value: string
  setValue: (str: string) => void
  error: string | undefined
  className?: string
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder,
  setValue,
  type,
  value,
  error,
  className,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          'w-full py-1 px-2 text-sm font-light transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white focus:border-blue-500',
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="block font-medium text-center text-red-600">
        {error}
      </small>
    </div>
  )
}

export default InputGroup

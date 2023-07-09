type FormFieldProps = {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
  isRandomPrompt?: boolean;
  handleRandomPrompt?: () => void;
};

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isRandomPrompt,
  handleRandomPrompt,
}: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isRandomPrompt && (
          <button
            type="button"
            onClick={handleRandomPrompt}
            className="font-semibold text-xs bg-gray-200 py-1 px-2 rounded-md text-black"
          >
            I feel lucky
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;

import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  options: { value: string; label: string; disable?: boolean }[] | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};
const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({ control, name });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;

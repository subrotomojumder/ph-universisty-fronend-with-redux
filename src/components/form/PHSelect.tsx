import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  disabled? : boolean; 
  options: { value: string; label: string; disable?: boolean }[] | undefined;
};
const PHSelect = ({ label, name, options , disabled}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{color: "red"}}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;

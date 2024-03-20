import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHTimePicker = ({ name, label, disabled }: TTimePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              id={name}
              size="large"
              style={{ width: "100%" }}
              disabled={disabled}
              format={"HH:mm"}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;

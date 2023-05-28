import { notification } from "antd";

const callNotification = (
  type: string,
  message: string,
  description: string = "",
  onClick: () => null = () => null
) => {
  if (type === "error") {
    notification.error({ message, description, onClick });
  } else if (type === "success") {
    notification.success({ message, description, onClick });
  } else {
    console.error(`Type not implemented yet: ${type}`);
  }
};

export default callNotification;

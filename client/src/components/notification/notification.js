import { notification } from "antd";

const createNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export default createNotification;

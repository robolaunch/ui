import { toast } from "sonner";

interface IApiInterface {
  res: any;
}

export default function toastApiNotifaction({ res }: IApiInterface) {
  res?.status === 200 || res?.status === 201
    ? toast.success(res?.data?.message)
    : toast.error(res?.data?.message);
}

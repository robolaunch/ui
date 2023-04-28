import { toast } from "sonner";

export default function toastApiNotifaction({ res }: any) {
  res?.status === 200 || res?.status === 201
    ? toast.success(res?.data?.message)
    : toast.error(res?.data?.message);
}

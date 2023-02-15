import React, { FC } from "react";

interface UsersCellProps {
  users?: any;
}

export const UsersCell: FC<UsersCellProps> = ({ users }: UsersCellProps) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex gap-2 items-center">
        <i className="pi pi-users" style={{ fontSize: "1.1rem" }}></i>
        <span>
          <b className="font-medium">Total:</b> {users?.length}
        </span>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <i className="pi pi-user-edit" style={{ fontSize: "1.1rem" }}></i>
          <span>
            <b className="font-medium">Admin:</b>{" "}
            {users.filter((user: any) => user.admin).length}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <i className="pi pi-user" style={{ fontSize: "0.85rem" }}></i>
          <span>
            <b className="font-medium">User:</b>{" "}
            {users.filter((user: any) => !user.admin).length}
          </span>
        </div>
      </div>
    </div>
  );
};

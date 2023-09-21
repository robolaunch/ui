import React, { ReactElement } from "react";

interface IUsersCell {
  users?: any;
}

export default function UsersCell({ users }: IUsersCell): ReactElement {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center gap-2">
        <i className="pi pi-users" style={{ fontSize: "1.1rem" }}></i>
        <span>
          <b className="font-medium">Total:</b> {users?.length}
        </span>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <i className="pi pi-user-edit" style={{ fontSize: "1.1rem" }}></i>
          <span>
            <b className="font-medium">Admin:</b>{" "}
            {users.filter((user: any) => user.admin).length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <i className="pi pi-user" style={{ fontSize: "0.85rem" }}></i>
          <span>
            <b className="font-medium">User:</b>{" "}
            {users.filter((user: any) => !user.admin).length}
          </span>
        </div>
      </div>
    </div>
  );
}

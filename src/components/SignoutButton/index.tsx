import { AppResponse } from "@/types";
import { Button } from "../ui/button";
import { useRouter } from "@tanstack/react-router";
import { POST } from "@/api-client/helpers";
import API from "@/api-client";
import { ConnectionFactory } from "@/socket-client";

export default function SignoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const response = await API.post<AppResponse>(POST("/auth/signout"));
        if (response?.data?.success) {
          ConnectionFactory.disconnectAll()
          router.invalidate();
        }
      }}
    >
      Signout
    </Button>
  );
}

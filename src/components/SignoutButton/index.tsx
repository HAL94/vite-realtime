import { AppResponse } from "@/types";
import { Button } from "../ui/button";
import { POST } from "@/api-client/helpers";
import API from "@/api-client";
import { ConnectionFactory } from "@/socket-client";
import { useAuth } from "@/contexts/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function SignoutButton() {
  const { setUserData } = useAuth();
  const queryClient = useQueryClient();
  return (
    <Button
      onClick={async () => {
        const response = await API.post<AppResponse<null>>(
          POST("/auth/signout")
        );
        if (response?.data?.success) {
          ConnectionFactory.disconnectAll();
          setUserData(undefined);
          queryClient.invalidateQueries({ queryKey: ["GetUser"] });
        }
      }}
    >
      Signout
    </Button>
  );
}

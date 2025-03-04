import { Button } from "@/components/ui/button";
import {
  isTokenValidAction,
  signOutAction,
} from "@/lib/modules/auth/auth.action";
import { LogOut } from "lucide-react";
import Form from "next/form";

const Account = async () => {
  const data = await isTokenValidAction();

  return (
    <div className="flex items-center gap-2">
      <span>{data?.access === "admin" ? "Admin" : "User"}</span>
      <Form action={signOutAction}>
        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="border-none size-8"
        >
          <LogOut />
        </Button>
      </Form>
    </div>
  );
};

export default Account;
